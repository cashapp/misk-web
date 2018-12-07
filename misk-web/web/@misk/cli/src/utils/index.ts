import * as emoji from "node-emoji"
import chalk from "chalk"
import { execSync } from "child_process"
import yargs = require("yargs")

export * from "./fs"
export * from "./migrate"

export enum MiskVersion {
  "v0_1_1_alpha_0_5" = "0.1.1-alpha-0.5"
}

export interface IMiskTabJSON {
  name: string
  port: number
  relative_path_prefix: string
  slug: string
  version: MiskVersion
}

export const log = console.log
export const logError = (s: string) => log(emoji.emojify(chalk.bold.red(s)))
export const logInfo = (s: string) => log(emoji.emojify(chalk.bold(s)))
export const logDetail = (s: string) => log(emoji.emojify(chalk.dim(s)))

export const cmdFromArgs = (exec: string) => {
  let args = process.argv
  args.splice(0, 1)
  args[0] = exec
  return args.join(" ")
}

export const runCmd = (cmd: string) => {
  try {
    const result = execSync(cmd, { stdio: "pipe", encoding: "utf-8" })
    console.log(result)
  } catch (e) {
    console.log(e.stdout)
    console.log(e.stderr)
  }
}

export const handleFail = (): void => {
  console.log(yargs.help().version())
  // const cmd = cmdFromArgs("npm")
  // logInfo(`Now running: $ ${cmd}`)
  // runCmd(cmd)
}
