import * as fs from "fs-extra"
import klaw from "klaw"
import path from "path"
const ProgressBar = require("progress")
import { cd, exec, pwd } from "shelljs"
import * as yargs from "yargs"
import { MiskVersion } from "./changelog"

export * from "./changelog"
export * from "./generate"
export * from "./migrate"

export interface IMiskTabJSON {
  name: string // name of tab in Title Case
  output_path: string // output path for Webpack build
  port: number // port for Webpack-Dev-Server
  rawGitginore: string // prebuild permanent add to .gitignore file
  rawPackageJson: any // prebuild permanent add/override to package.json file
  rawTsconfig: any // prebuild permanent add/override to tsconfig.json file
  rawTslint: any // prebuild permanent add/override to tslint.json file
  rawWebpackConfig: any // prebuild permanent add to webpack.config.js file
  relative_path_prefix: string // override default URL for tab: /_tab/{slug}/
  slug: string // unique slug used in URL path
  useWebpackExternals: boolean // turn off/on thin build by including externals in Webpack build
  version: MiskVersion // Misk Web release version or keyword (alpha, latest)
  zipOnBuild: boolean // zip relevant source code of tab into {slug}.tgz after each build
  ___DeprecatedKeys: string // divider to the miskTab.json to improve maintainability
}

export const defaultMiskTabJson: IMiskTabJSON = {
  name: "",
  output_path: "",
  port: 3000,
  rawGitginore: "",
  rawPackageJson: {},
  rawTsconfig: {},
  rawTslint: {},
  rawWebpackConfig: {},
  relative_path_prefix: "",
  slug: "",
  useWebpackExternals: true,
  version: MiskVersion.latest,
  zipOnBuild: false,
  ___DeprecatedKeys:
    "Any keys below this point in your miskTab.json are deprecated and can be safely removed."
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
      `Shell command \`${cmd}\` exited with code ${terminal.code}. ${
        terminal.stderr
      }`
    )
  }
}

export const readMiskTabJson = (dir: string): IMiskTabJSON =>
  fs.readJSONSync(makePath(dir, Files.miskTab))

export const generateMiskTabJson = (dir: string, newMiskTab?: IMiskTabJSON) => {
  const miskTab = readMiskTabJson(dir)
  fs.writeJsonSync(
    makePath(dir, Files.miskTab),
    {
      ...defaultMiskTabJson,
      ...miskTab,
      ...newMiskTab
    },
    JsonOptions
  )
}

export const npmRunScript = (cmd: string, prebuild: boolean = false) =>
  `${prebuild ? "miskweb prebuild && " : ""}npm run-script ${cmd}`

/**
 * @param item full file path
 * Want to stop traversion over directory names that are unlikely to have a Misk Web tab inside.
 * These files include:
 *   * hidden directories (prefix: .)
 *   * node_modules directory
 */
const filterFunc = (item: string) => {
  const basename = path.basename(item)
  return (
    (basename === "." || basename[0] !== ".") && basename !== "node_modules"
  )
}

export const handleCommand = async (
  args: {
    _: string[]
    e: boolean
    each: boolean
    $0: string
  },
  handlerFn: (...args: any) => void,
  blockedOptions: string[] = []
) => {
  let invalidOptions: string[] = []
  blockedOptions.map((opt: string) => {
    if (opt in args) {
      invalidOptions.push(opt)
    }
  })
  if (invalidOptions.length > 0) {
    console.error(
      `Invalid use of ${invalidOptions.map(
        opt => `-${opt} `
      )} option with command ${args._[0]}.`
    )
    yargs
      .hide(invalidOptions[0])
      .hide("help")
      .hide("version")
      .showHelp()
  } else if (args.each) {
    const bar = new ProgressBar(`[EACH][:bar]`, {
      complete: "=",
      incomplete: " ",
      width: 80,
      total: 10
    })
    const tabs: string[] = []
    klaw(".", { filter: filterFunc })
      .on("data", (item: any) => {
        if (item.stats.isFile() && item.path.includes("/miskTab.json")) {
          if (tabs.length < 10) bar.tick(1)
          tabs.push(item.path.split("/miskTab.json")[0])
        }
      })
      .on("error", (err: Error) => console.error(err))
      .on("end", async () => {
        bar.tick(10 - tabs.length)
        for (const tab in tabs) {
          cd(tabs[tab])
          handlerFn({ ...args, dir: tabs[tab] })
        }
      })
  } else {
    handlerFn(args)
  }
}
