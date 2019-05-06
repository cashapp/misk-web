import * as fs from "fs-extra"
import klaw from "klaw"
import { cd, exec, pwd } from "shelljs"
import * as yargs from "yargs"
import { MiskVersion } from "./changelog"

export * from "./changelog"
export * from "./generate"
export * from "./migrate"

export interface IMiskTabJSON {
  name: string
  output_path: string
  port: number
  rawGitginore: string
  rawPackageJson: any
  rawTsconfig: any
  rawTslint: any
  rawWebpackConfig: any
  relative_path_prefix: string
  slug: string
  useWebpackExternals: boolean
  version: MiskVersion
  zipOnBuild: boolean
  ___DeprecatedKeys: string
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

export const path = (...segments: string[]) => `${segments.join("/")}`

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

export const npmRunScript = (cmd: string, prebuild: boolean = false) =>
  `${prebuild ? "miskweb prebuild && " : ""}npm run-script ${cmd}`

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
    const tabs: string[] = []
    klaw(".")
      .on("data", (item: any) => {
        if (item.stats.isFile() && item.path.includes("/miskTab.json")) {
          tabs.push(item.path.split("/miskTab.json")[0])
        }
      })
      .on("error", (err: Error) => console.error(err))
      .on("end", async () => {
        for (const tab in tabs) {
          cd(tabs[tab])
          handlerFn({ ...args, dir: tabs[tab] })
        }
      })
  } else {
    handlerFn(args)
  }
}
