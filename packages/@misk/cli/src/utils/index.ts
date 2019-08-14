import * as fs from "fs-extra"
import { cd, exec, pwd } from "shelljs"

export * from "./generate"
export * from "./handleCommand"
export * from "./miskTabUtilities"
export * from "./resolveNpmVersion"

export enum MiskPkg {
  "cli" = "@misk/cli",
  "common" = "@misk/common",
  "core" = "@misk/core",
  "dev" = "@misk/dev",
  "prettier" = "@misk/prettier",
  "simpleredux" = "@misk/simpleredux",
  "test" = "@misk/test",
  "tslint" = "@misk/tslint"
}

export interface IMiskTabJSON {
  name: string // name of tab in Title Case
  output_path: string // output path for Webpack build
  port: number // port for Webpack-Dev-Server
  rawGitginore: string // prebuild permanent add to .gitignore file
  rawIndex: boolean // ignore Webpack injection of source links to index.html
  rawPackageJson: any // prebuild permanent add/override to package.json file
  rawTsconfig: any // prebuild permanent add/override to tsconfig.json file
  rawTslint: any // prebuild permanent add/override to tslint.json file
  rawWebpackConfig: any // prebuild permanent add to webpack.config.js file
  relative_path_prefix: string // override default URL for tab: /_tab/{slug}/
  slug: string // unique slug used in URL path
  useWebpackBundleAnalyzer: boolean // turn off/on webpack bundle analyzer reports
  useWebpackExternals: boolean // turn off/on thin build by including externals in Webpack build
  version: string // Misk Web release version or keyword (alpha, latest)
  zipOnBuild: boolean // zip relevant source code of tab into {slug}.tgz after each build
  ___DeprecatedKeys: string // divider to the miskTab.json to improve maintainability
}

export enum Files {
  "gitignore" = ".gitignore",
  "masterDependencies" = "master-dependencies.json",
  "miskTab" = "miskTab.json",
  "old" = ".old_build_files",
  "package" = "package.json",
  "packageLock" = "package-lock.json",
  "prettier" = "prettier.config.js",
  "setupMiskTest" = "setupMiskTest.js",
  "tsconfig" = "tsconfig.json",
  "tslint" = "tslint.json",
  "webpack" = "webpack.config.js",
  "yarnLock" = "yarn.lock"
}

export const JsonOptions = { spaces: 2 }

export const logFormatter = (
  tag: string,
  msg?: string,
  dir: string = pwd().stdout
) =>
  `[${tag.toUpperCase()}][${dir
    .split("/")
    .pop()
    .toUpperCase()}] ${msg}`

export const logDebug = (
  tag: string,
  msg?: string,
  dir: string = pwd().stdout
) => console.log(logFormatter(tag, msg, dir))

export const makePath = (...segments: string[]) => `${segments.join("/")}`

export const parseArgs = (...args: any): { dir: string; rawArgs: any } => ({
  dir: pwd().stdout,
  rawArgs: args
})

export const remove = async (path: string) => {
  try {
    fs.remove(path)
  } catch (e) {
    console.log(`[ERROR] ${e}`)
  }
}

export const execute = (cmd: string, ...args: any) => {
  const { dir } = parseArgs(...args)
  cd(dir)
  const terminal = exec(cmd)
  terminal.stdout
  if (terminal.code) {
    throw new Error(
      `Shell command \`${cmd}\` exited with code ${terminal.code}. ${terminal.stderr}`
    )
  }
}

export const npmRunScript = (cmd: string, prebuild: boolean = false) =>
  `${prebuild ? "miskweb prebuild && " : ""}npm run-script ${cmd}`
