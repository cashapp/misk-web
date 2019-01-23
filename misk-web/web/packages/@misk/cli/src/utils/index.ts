import { execSync } from "child_process"
import yargs = require("yargs")
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

export const cmdFromArgs = (exec: string) => {
  const args = process.argv
  args.splice(0, 1)
  args[0] = exec
  return args.join(" ")
}

export const runCmd = (cmd: string) => {
  try {
    execSync(cmd, { stdio: "inherit", encoding: "utf-8" })
  } catch (e) {
    console.log(e.stdout)
    console.log(e.stderr)
  }
}

export const handleFail = (): void => {
  console.log(yargs.help().version())
  // const cmd = cmdFromArgs("npm")
  // console.log("Now running: $ ${cmd}")
  // runCmd(cmd)
}
