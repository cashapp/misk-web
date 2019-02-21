"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs-extra"));
var utils_1 = require("../utils");
var changelog_1 = require("./changelog");
var moveOldBuildFile = function (filename) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fs.existsSync(filename)];
            case 1:
                if (_a.sent()) {
                    fs.move(filename, utils_1.Files.old + "/" + filename);
                }
                return [2];
        }
    });
}); };
var removeOldBuildFile = function (filename) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fs.existsSync(filename)];
            case 1:
                if (_a.sent()) {
                    fs.remove(filename);
                }
                return [2];
        }
    });
}); };
exports.migrate = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var pkgMiskTab, pkg, _a, _b, _c, normalizedMiskTab, _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                console.log("[MIGRATE] Verify valid build files or migrate old build files to new miskweb generated build files");
                return [4, fs.existsSync(utils_1.Files.package)];
            case 1:
                if (!_e.sent()) return [3, 3];
                return [4, fs.readJson(utils_1.Files.package)];
            case 2:
                pkg = _e.sent();
                if (pkg.name.startsWith("@misk/")) {
                    throw Error("miskweb CLI build file generation will not be done on @misk/ packages which have custom build tools.");
                }
                pkgMiskTab = pkg.miskTab ? pkg.miskTab : null;
                return [3, 4];
            case 3:
                pkgMiskTab = null;
                _e.label = 4;
            case 4:
                _a = pkgMiskTab;
                if (!_a) return [3, 6];
                return [4, fs.existsSync(utils_1.Files.miskTab)];
            case 5:
                _a = (_e.sent());
                _e.label = 6;
            case 6:
                if (!_a) return [3, 7];
                throw Error("[MIGRATE] Remove existing miskTab.json OR remove miskTab block from existing package.json.");
            case 7:
                _b = !pkgMiskTab;
                if (!_b) return [3, 9];
                return [4, fs.existsSync(utils_1.Files.miskTab)];
            case 8:
                _b = (_e.sent());
                _e.label = 9;
            case 9:
                if (!_b) return [3, 10];
                console.log("[MIGRATE] miskTab.json exists. No migration required.");
                return [3, 17];
            case 10:
                _c = pkgMiskTab;
                if (!_c) return [3, 12];
                return [4, fs.existsSync(utils_1.Files.miskTab)];
            case 11:
                _c = !(_e.sent());
                _e.label = 12;
            case 12:
                if (!_c) return [3, 14];
                normalizedMiskTab = tslib_1.__assign({ output_path: "lib/web/_tab/" + pkgMiskTab.slug, port: 4242, version: changelog_1.MiskVersion.latest, zipOnBuild: false }, pkgMiskTab);
                fs.writeJson(utils_1.Files.miskTab, normalizedMiskTab, utils_1.JsonOptions);
                console.log("[MIGRATE] Stashing old build files in ./" + utils_1.Files.old);
                return [4, fs.mkdirp(utils_1.Files.old)];
            case 13:
                _e.sent();
                fs.copy(utils_1.Files.package, utils_1.Files.old + "/" + utils_1.Files.package);
                moveOldBuildFile(utils_1.Files.gitignore);
                moveOldBuildFile(utils_1.Files.prettier);
                moveOldBuildFile(utils_1.Files.tsconfig);
                moveOldBuildFile(utils_1.Files.tslint);
                moveOldBuildFile(utils_1.Files.webpack);
                removeOldBuildFile(utils_1.Files.packageLock);
                removeOldBuildFile(utils_1.Files.yarnLock);
                return [3, 17];
            case 14:
                _d = !pkgMiskTab;
                if (!_d) return [3, 16];
                return [4, fs.existsSync(utils_1.Files.miskTab)];
            case 15:
                _d = !(_e.sent());
                _e.label = 16;
            case 16:
                if (_d) {
                    throw Error("[MIGRATE] No miskTab.json present and no miskTab block in existing package.json. miskweb CLI build file generation will not be attempted.");
                }
                _e.label = 17;
            case 17: return [2];
        }
    });
}); };
//# sourceMappingURL=migrate.js.map