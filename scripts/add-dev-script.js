const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(process.cwd(), "package.json");
const packageJson = require(packageJsonPath);

packageJson.scripts = packageJson.scripts || {};
packageJson.scripts["dev:ext"] = "node scripts/dev.js";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
