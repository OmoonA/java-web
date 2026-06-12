const fs = require("fs");
const path = require("path");

const resourceRoot = path.join(__dirname, "../../main/resources/META-INF/resources");
const pages = [
    "main_page_sub/news.html",
    "main_page_sub/champions.html",
];

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

pages.forEach(function (page) {
    const html = fs.readFileSync(path.join(resourceRoot, page), "utf8");
    assert(html.includes("id=\"authNavItems\""), page + " should have replaceable auth nav item");
    assert(html.includes("fetch('/profile/info', { credentials: 'same-origin' })"), page + " should check login session");
    assert(html.includes("href=\"/logout\""), page + " should render logout link after login");
    assert(html.includes("href=\"/profile\""), page + " should render profile link after login");
});

console.log("auth nav page tests passed");
