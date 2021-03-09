import { IMiskTabJSON } from "../index"

export const createTsconfig = (miskTab: IMiskTabJSON) => ({
  compileOnSave: true,
  compilerOptions: {
    allowSyntheticDefaultImports: true,
    baseUrl: ".",
    declaration: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    importHelpers: true,
    jsx: "react",
    lib: [
      "dom",
      "dom.iterable",
      "es5",
      "es2015.collection",
      "es2015.iterable",
      "es6",
      "es2017"
    ],
    module: "commonjs",
    moduleResolution: "node",
    noFallthroughCasesInSwitch: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noUnusedLocals: true,
    outDir: miskTab.output_path,
    pretty: true,
    removeComments: false,
    sourceMap: true,
    stripInternal: true,
    target: "es5",
    typeRoots: ["node_modules/@types"],
    types: ["jest", "node"],
    ...miskTab.rawTsconfig
  },
  include: ["src/**/*", "tests/**/*", ...miskTab.rawTsconfigInclude]
})
