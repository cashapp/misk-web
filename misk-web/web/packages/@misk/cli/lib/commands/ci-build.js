"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require("./");
var utils_1 = require("../utils");
exports.command = "ci-build";
exports.desc = "run a fast, clean, webpack production build";
function handler() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, _1.prebuild()];
                case 1:
                    _a.sent();
                    console.log("[CI-BUILD]");
                    utils_1.runCmd("sh -c 'npm run-script ci-build'");
                    return [2];
            }
        });
    });
}
exports.handler = handler;
//# sourceMappingURL=ci-build.js.map