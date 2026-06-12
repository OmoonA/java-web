const fs = require("fs");
const path = require("path");

const resourceRoot = path.join(__dirname, "../../main/resources/META-INF/resources");
const pages = [
    ["Index1.html", "images/role/logo.png"],
    ["index2.html", "images/role/logo.png"],
    ["main_index.html", "images/role/logo.png"],
    ["login/login.html", "../images/role/logo.png"],
    ["login/main_after_login.html", "../images/role/logo.png"],
    ["login/profile.html", "../images/role/logo.png"],
    ["login/register.html", "../images/role/logo.png"],
    ["login/register_success.html", "../images/role/logo.png"],
    ["main_page_sub/news.html", "../images/role/logo.png"],
    ["main_page_sub/champions.html", "../images/role/logo.png"],
    ["main_page_sub/download.html", "../images/role/logo.png"],
    ["modals/Aatrox.html", "../images/role/logo.png"],
    ["modals/Mel.html", "../images/role/logo.png"],
];

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

pages.forEach(function ([page, href]) {
    const html = fs.readFileSync(path.join(resourceRoot, page), "utf8");
    const favicon = `<link rel="icon" type="image/png" href="${href}">`;
    assert(html.includes(favicon), page + " should include favicon link");
});

console.log("favicon link tests passed");
