"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
exports.command = "prebuild";
exports.desc = "consume miskTab.json and write necessary build files";
function handler() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("[PREBUILD]");
                    return [4, utils_1.migrate().catch(function (e) {
                            throw new Error("Migrating miskTab failed. " + e);
                        })];
                case 1:
                    _a.sent();
                    console.log("[PREBUILD] Generating up to date build files");
                    return [4, utils_1.generateBuildFiles().catch(function (e) {
                            throw new Error("Generating up to date build files failed. " + e);
                        })];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log("[ERROR] Generating up to date build files failed. " + e_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
exports.handler = handler;
//# sourceMappingURL=prebuild.js.map