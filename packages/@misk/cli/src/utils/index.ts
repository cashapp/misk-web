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
  relative_path_prefix: string
  slug: string
  tsconfigCompilerOptions: any
  version: MiskVersion
  zipOnBuild: boolean
}

export enum Files {
  "gitignore" = ".gitignore",
  "miskTab" = "miskTab.json",
  "old" = ".old_build_files",
  "package" = "package.json",
  "packageLock" = "package-lock.json",
  "prettier" = "prettier.config.js",
  "tsconfig" = "tsconfig.json",
  "tslint" = "tslint.json",
  "webpack" = "webpack.config.js",
  "yarnLock" = "yarn.lock"
}

export const JsonOptions = { spaces: 2 }

export const cmdHeader = (cmd: string) =>
  console.log(`[${cmd.toUpperCase()}] ${pwd()}`)

export const prebuild = async (...args: any) =>
  execute("miskweb prebuild", ...args)

export const execute = async (cmd: string, ...args: any) => {
  const dir = args[0]
  if (dir) {
    cd(dir)
  }
  pwd().stdout
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
    klaw(".")
      .on("data", (item: any) => {
        if (item.stats.isFile() && item.path.includes("/miskTab.json")) {
          const dir = item.path.split("/miskTab.json")[0]
          cd(dir)
          handlerFn(dir)
        }
      })
      .on("error", (err: Error) => console.error(err))
  } else {
    handlerFn()
  }
}
