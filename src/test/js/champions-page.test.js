const fs = require("fs");
const path = require("path");
const vm = require("vm");

const scriptPath = path.join(__dirname, "../../main/resources/META-INF/resources/js/champions-page.js");
const script = fs.readFileSync(scriptPath, "utf8");
const context = { window: {}, document: { addEventListener() {} } };

vm.createContext(context);
vm.runInContext(script, context);

const data = context.window.CHAMPION_PAGE_DATA;
const filter = context.window.filterChampionsByRole;

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

assert(Array.isArray(data), "CHAMPION_PAGE_DATA should be exposed");
assert(typeof filter === "function", "filterChampionsByRole should be exposed");
assert(filter("all").length === data.length, "all role should show every champion");
assert(filter("warrior").every((champ) => champ.roleKey === "warrior"), "warrior role should show only warrior champions");
assert(filter("wizard").some((champ) => champ.en === "Mel"), "wizard role should include Mel");
assert(filter("supporter").length === 0, "empty roles should return an empty list");
assert(data.find((champ) => champ.en === "Aatrox").img === "../images/Aatrox.png", "Aatrox should use the local name png");
assert(data.find((champ) => champ.en === "Mel").img === "../images/Mel.png", "Mel should use the local name png");
assert(data.find((champ) => champ.en === "Zaahen").img.indexOf("Zaahen.png") < 0, "Zaahen should not be changed to a missing png");

console.log("champions-page tests passed");
