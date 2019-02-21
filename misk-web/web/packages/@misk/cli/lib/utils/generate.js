"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs-extra"));
var utils_1 = require("../utils");
var templates_1 = require("./templates");
var changelog_1 = require("./changelog");
exports.generateBuildFiles = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var pkg, miskTab;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fs.readJson(utils_1.Files.package)];
            case 1:
                pkg = _a.sent();
                return [4, fs.readJson(utils_1.Files.miskTab)];
            case 2:
                miskTab = _a.sent();
                return [4, [
                        fs.writeJson(utils_1.Files.tsconfig, templates_1.createTsconfig(miskTab), utils_1.JsonOptions),
                        fs.writeJson(utils_1.Files.tslint, templates_1.tslint, utils_1.JsonOptions),
                        fs.writeJson(utils_1.Files.package, templates_1.createPackage(miskTab, pkg), utils_1.JsonOptions),
                        fs.writeFile(utils_1.Files.gitignore, templates_1.gitignore),
                        fs.writeFile(utils_1.Files.webpack, templates_1.webpack)
                    ]];
            case 3:
                _a.sent();
                return [4, fs.writeFile(utils_1.Files.tsconfig, templates_1.generatedByCLI, { flag: "a" })];
            case 4:
                _a.sent();
                return [4, fs.writeFile(utils_1.Files.tslint, templates_1.generatedByCLI, { flag: "a" })];
            case 5:
                _a.sent();
                console.log("[GENERATE] Up to date build files generated using Misk Web version " + changelog_1.getVersion(miskTab.version));
                return [2];
        }
    });
}); };
//# sourceMappingURL=generate.js.map