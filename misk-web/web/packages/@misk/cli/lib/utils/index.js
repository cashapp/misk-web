"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var child_process_1 = require("child_process");
var yargs = require("yargs");
tslib_1.__exportStar(require("./changelog"), exports);
tslib_1.__exportStar(require("./generate"), exports);
tslib_1.__exportStar(require("./migrate"), exports);
var Files;
(function (Files) {
    Files["gitignore"] = ".gitignore";
    Files["miskTab"] = "miskTab.json";
    Files["old"] = ".old_build_files";
    Files["package"] = "package.json";
    Files["packageLock"] = "package-lock.json";
    Files["prettier"] = "prettier.config.js";
    Files["tsconfig"] = "tsconfig.json";
    Files["tslint"] = "tslint.json";
    Files["webpack"] = "webpack.config.js";
    Files["yarnLock"] = "yarn.lock";
})(Files = exports.Files || (exports.Files = {}));
exports.JsonOptions = { spaces: 2 };
exports.cmdFromArgs = function (exec) {
    var args = process.argv;
    args.splice(0, 1);
    args[0] = exec;
    return args.join(" ");
};
exports.runCmd = function (cmd) {
    try {
        child_process_1.execSync(cmd, { stdio: "inherit", encoding: "utf-8" });
    }
    catch (e) {
        console.log(e.stdout);
        console.log(e.stderr);
    }
};
exports.handleFail = function () {
    console.log(yargs.help().version());
};
//# sourceMappingURL=index.js.map