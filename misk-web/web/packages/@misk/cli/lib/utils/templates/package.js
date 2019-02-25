"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var templates_1 = require("../templates");
var changelog_1 = require("../changelog");
var header = {
    license: "SEE LICENSE IN https://github.com/square/misk-web",
    main: "src/index.tsx"
};
var scripts = function (miskTab) { return ({
    engines: {
        yarn: "YARN NO LONGER USED - use npm instead."
    },
    scripts: {
        build: miskTab.zipOnBuild
            ? "npm run-script ci-build && npm run-script zip"
            : "npm run-script ci-build",
        "ci-build": "npm run-script clean && miskweb prebuild && npm run-script lib",
        clean: "rm -rf demo lib",
        lib: "cross-env NODE_ENV=production webpack",
        lint: 'prettier --write --config package.json ".{/src/**/,/}*.{md,css,sass,less,json,js,jsx,ts,tsx}"',
        prebuild: "npm run-script lint",
        reinstall: "rm -rf node_modules && npm run-script install",
        start: "npm run-script prebuild && cross-env NODE_ENV=development webpack-dev-server",
        test: "echo no test",
        zip: "tar --exclude='.DS_Store' --exclude='.old_build_files' --exclude='demo' --exclude='lib' --exclude='node_modules' --exclude='package-lock.json' --exclude='" + miskTab.slug + ".tgz' -czvf " + miskTab.slug + ".tgz ./"
    }
}); };
var dependencies = function (miskTab, pkg) {
    var _a;
    return ({
        dependencies: tslib_1.__assign({}, pkg.dependencies, (_a = {}, _a[changelog_1.MiskPkg.common] = "^" + changelog_1.getPackageVersion(changelog_1.MiskPkg.common, miskTab.version), _a[changelog_1.MiskPkg.core] = "^" + changelog_1.getPackageVersion(changelog_1.MiskPkg.core, miskTab.version), _a[changelog_1.MiskPkg.simpleredux] = "^" + changelog_1.getPackageVersion(changelog_1.MiskPkg.simpleredux, miskTab.version), _a))
    });
};
var devDependencies = function (miskTab, pkg) {
    var _a;
    return ({
        devDependencies: tslib_1.__assign({}, pkg.devDependencies, (_a = {}, _a[changelog_1.MiskPkg.cli] = "^" + changelog_1.getPackageVersion(changelog_1.MiskPkg.cli, miskTab.version), _a[changelog_1.MiskPkg.dev] = "^" + changelog_1.getPackageVersion(changelog_1.MiskPkg.dev, miskTab.version), _a[changelog_1.MiskPkg.tslint] = "^" + changelog_1.getPackageVersion(changelog_1.MiskPkg.tslint, miskTab.version), _a))
    });
};
exports.createPackage = function (miskTab, pkg) { return (tslib_1.__assign({ name: "misk-web-tab-" + miskTab.slug, version: pkg.version }, header, scripts(miskTab), dependencies(miskTab, pkg), devDependencies(miskTab, pkg), templates_1.prettier, { generated: templates_1.generatedByCLI })); };
//# sourceMappingURL=package.js.map