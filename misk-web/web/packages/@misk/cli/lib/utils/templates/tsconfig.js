"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.createTsconfig = function (miskTab) { return ({
    compileOnSave: true,
    compilerOptions: tslib_1.__assign({ allowSyntheticDefaultImports: true, baseUrl: ".", declaration: true, esModuleInterop: true, experimentalDecorators: true, importHelpers: true, jsx: "react", lib: [
            "dom",
            "dom.iterable",
            "es5",
            "es2015.collection",
            "es2015.iterable",
            "es6",
            "es2017"
        ], module: "commonjs", moduleResolution: "node", noFallthroughCasesInSwitch: true, noImplicitAny: true, noImplicitReturns: true, noUnusedLocals: true, outDir: miskTab.output_path, pretty: true, removeComments: false, sourceMap: true, stripInternal: true, target: "es5", typeRoots: ["../node_modules/@types"], types: ["node"] }, miskTab.tsconfigCompilerOptions),
    include: ["src/**/*"]
}); };
//# sourceMappingURL=tsconfig.js.map