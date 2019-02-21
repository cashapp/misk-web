"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("../templates");
exports.webpack = "const { createTabWebpack } = require(\"@misk/dev\")\nconst path = require(\"path\")\nconst miskTab = require(path.join(process.cwd(), \"miskTab.json\"))\nmodule.exports = createTabWebpack(process.env.NODE_ENV, {\n  dirname: __dirname,\n  miskTab\n})\n" + templates_1.generatedByCLI + "\n";
//# sourceMappingURL=webpack.js.map