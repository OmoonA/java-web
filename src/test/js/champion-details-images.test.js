const fs = require("fs");
const path = require("path");
const vm = require("vm");

const scriptPath = path.join(__dirname, "../../main/resources/META-INF/resources/js/championDetails.js");
const script = fs.readFileSync(scriptPath, "utf8");
const context = {
    window: { location: { pathname: "/main_index.html" } },
    document: { addEventListener() {} },
};

vm.createContext(context);
vm.runInContext(script + "\nwindow.__details = CHAMPION_DETAILS;\nwindow.__getPath = getChampionImagePath;", context);

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

const details = context.window.__details;
const getPath = context.window.__getPath;

assert(Array.isArray(details), "CHAMPION_DETAILS should be available");
assert(typeof getPath === "function", "getChampionImagePath should be available");
assert(details.find((champ) => champ.en === "Jinx").img === "Jinx.png", "Jinx should use the local name png");
assert(details.find((champ) => champ.en === "Yunara").img === "Yunara.png", "Yunara should use the local name png");
assert(details.find((champ) => champ.en === "Zaahen").img.indexOf("Zaahen.png") < 0, "Zaahen should not be changed to a missing png");
assert(getPath("Aatrox.png") === "images/Aatrox.png", "root page should use images prefix");

context.window.location.pathname = "/login/main_after_login.html";
assert(getPath("Aatrox.png") === "../images/Aatrox.png", "sub page should use parent images prefix");

console.log("champion-details image tests passed");
