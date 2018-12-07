import chalk from "chalk"
import { execSync } from "child_process"
import * as emoji from "node-emoji"
import yargs = require("yargs")

export * from "./generate"
export * from "./migrate"

export enum MiskVersion {
  "v0_1_1_alpha_0_5" = "0.1.1-alpha-0.5"
}

export interface IMiskTabJSON {
  name: string
  outDir: string
  port: number
  relative_path_prefix: string
  slug: string
  version: string
}

export enum Files {
  "gitignore" = ".gitignore",
  "miskTab" = "miskTab.json",
  "old" = ".old_build_files",
  "package" = "package.json",
  "prettier" = "prettier.config.js",
  "tsconfig" = "tsconfig.json",
  "tslint" = "tslint.json",
  "webpack" = "webpack.config.js"
}

export interface IMiskTabVersion {
  date: string
  "@misk/cli": string
  "@misk/common": string
  "@misk/core": string
  "@misk/dev": string
  "@misk/tslint": string
  notes?: string
}

export interface IMiskTabVersions {
  [key: string]: IMiskTabVersion
}

// const MiskTabVersionTemplate: IMiskTabVersions = {
//   "0.1.1-alpha-*": {
//     "@misk/cli": "0.0.*",
//     "@misk/common": "0.1.1-*",
//     "@misk/core": "0.1.1-*",
//     "@misk/dev": "0.1.1-*",
//     "@misk/tslint": "0.1.1-*",
//     date: "2018-12-* ",
//     notes: "Alpha"
//   }
// }

export const MiskTabVersions: IMiskTabVersions = {
  latest: {
    "@misk/cli": "0.0.5",
    "@misk/common": "0.1.1",
    "@misk/core": "0.1.1",
    "@misk/dev": "0.1.1",
    "@misk/tslint": "0.1.1",
    date: "2018-12-7",
    notes:
      "Stable release before CLI adoption.                                                                                      "
  },
  "0.1.2-alpha-0.1": {
    "@misk/cli": "0.0.5",
    "@misk/common": "0.1.1",
    "@misk/core": "0.1.1",
    "@misk/dev": "0.1.1",
    "@misk/tslint": "0.1.1",
    date: "2018-12-7  ",
    notes: "CLI adoption."
  },
  "0.1.1": {
    "@misk/cli": "0.0.5",
    "@misk/common": "0.1.1",
    "@misk/core": "0.1.1",
    "@misk/dev": "0.1.1",
    "@misk/tslint": "0.1.1",
    date: "2018-12-7  ",
    notes:
      "Stable release before CLI adoption.                                                                                      "
  },
  "0.1.1-alpha-0.6": {
    "@misk/cli": "0.0.3",
    "@misk/common": "0.1.1-alpha-0.3",
    "@misk/core": "0.1.1-alpha-0.17",
    "@misk/dev": "0.1.1-alpha-0.4",
    "@misk/tslint": "0.1.1-alpha-0.1",
    date: "2018-12-6  ",
    notes: "Initial CLI work."
  },
  "0.1.1-alpha-0.5": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.1-alpha-0.3",
    "@misk/core": "0.1.1-alpha-0.17",
    "@misk/dev": "0.1.1-alpha-0.4",
    "@misk/tslint": "0.1.1-alpha-0.1",
    date: "2018-12-6  ",
    notes:
      "Revert changes in 0.1.1-alpha-0.4. Remove `noUnusedParameters` from tsconfig base in `@misk/dev`"
  },
  "0.1.1-alpha-0.4": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.1-alpha-0.3",
    "@misk/core": "0.1.1-alpha-0.14",
    "@misk/dev": "0.1.1-alpha-0.3",
    "@misk/tslint": "0.1.1-alpha-0.1",
    date: "2018-12-5  ",
    notes: "[DEPRECATED] D"
  },
  "0.1.1-alpha-0.3": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.1-alpha-0.3",
    "@misk/core": "0.1.1-alpha-0.9",
    "@misk/dev": "0.1.1-alpha-0.3",
    "@misk/tslint": "0.1.1-alpha-0.1",
    date: "2018-12-4  ",
    notes: "SimpleNetwork Ducks with S"
  },
  "0.1.1-alpha-0.1": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.1-alpha-0.1",
    "@misk/core": "0.1.1-alpha-0.1",
    "@misk/dev": "0.1.1-alpha-0.2",
    "@misk/tslint": "0.1.1-alpha-0.1",
    date: "2018-11-30 ",
    notes: "Rename @misk/core to @misk/core."
  },
  "0.1.0": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.0",
    "@misk/core": "0.1.0",
    "@misk/dev": "0.1.0",
    "@misk/tslint": "0.1.0",
    date: "2018-11-30 ",
    notes:
      "Stable Release 0.1.0. Migrate from awesome-typescript-loader to ts-loader. Rename @misk/core to @misk/core."
  },
  "0.0.12": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.0-alpha-0.6",
    "@misk/core": "0.1.0-alpha-0.16",
    "@misk/dev": "0.1.0-alpha-0.3",
    "@misk/tslint": "0.1.0-alpha-0.1",
    date: "2018-11-29 ",
    notes: "Added `reselect` l"
  },
  "0.0.11": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.0-alpha-0.5",
    "@misk/core": "0.1.0-alpha-0.16",
    "@misk/dev": "0.1.0-alpha-0.2",
    "@misk/tslint": "0.1.0-alpha-0.1",
    date: "2018-11-28 ",
    notes: "[DEPRECATED] Added `reselect` library."
  },
  "0.0.10": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.0-alpha-0.3",
    "@misk/core": "0.1.0-alpha-0.15",
    "@misk/dev": "0.1.0-alpha-0.1",
    "@misk/tslint": "0.1.0-alpha-0.1",
    date: "2018-11-27 ",
    notes: "Robust ErrorCalloutComponent, async network r"
  },
  "0.0.9": {
    "@misk/cli": "     ",
    "@misk/common": "0.1.0-alpha-0.3",
    "@misk/core": "0.1.0-alpha-0.7",
    "@misk/dev": "0.1.0-alpha-0.1",
    "@misk/tslint": "0.1.0-alpha-0.1",
    date: "2018-11-26 ",
    notes: "Fixed refreshNodeModules command."
  },
  "0.0.8": {
    "@misk/cli": "     ",
    "@misk/common": "0.0.70",
    "@misk/core": "0.0.90",
    "@misk/dev": "0.0.69",
    "@misk/tslint": "0.0.10",
    date: "2018-11-20 ",
    notes:
      "0.0.5 misk-web runtime. Large changes to Topbar Component, color Enum added with standard colors."
  },
  "0.0.7": {
    "@misk/cli": "     ",
    "@misk/common": "0.0.70",
    "@misk/core": "0.0.90",
    "@misk/dev": "0.0.69",
    "@misk/tslint": "0.0.10",
    date: "2018-11-19 ",
    notes:
      "[DEPRECATED] Large changes to Topbar Component, color Enum added with standard colors."
  },
  "0.0.6": {
    "@misk/cli": "     ",
    "@misk/common": "0.0.70",
    "@misk/core": "0.0.90",
    "@misk/dev": "0.0.69",
    "@misk/tslint": "0.0.10",
    date: "2018-11-16 ",
    notes:
      "[DEPRECATED] Large changes to Topbar Component, color Enum added with standard colors."
  },
  "0.0.5": {
    "@misk/cli": "     ",
    "@misk/common": "0.0.61",
    "@misk/core": "0.0.79",
    "@misk/dev": "0.0.64",
    "@misk/tslint": "0.0.10",
    date: "2018-11-07 ",
    notes: "Includes CSS to support all `@blueprintjs` packages."
  },
  "0.0.4": {
    "@misk/cli": "     ",
    "@misk/common": "0.0.60",
    "@misk/core": "0.0.76",
    "@misk/dev": "0.0.61",
    "@misk/tslint": "0.0.10",
    date: "2018-11-06 ",
    notes: "Includes all `@blueprintjs` packages."
  },
  "0.0.3": {
    "@misk/cli": "     ",
    "@misk/common": "0.0.59",
    "@misk/core": "0.0.76",
    "@misk/dev": "0.0.60",
    "@misk/tslint": "0.0.10",
    date: "2018-11-05 ",
    notes:
      "Assumes `node_modules` installed centrally in `web/node_modules`. This will involve updating `tsconfig.json` in each tab."
  },
  "0.0.2": {
    "@misk/cli": "     ",
    "@misk/common": "0.0.55",
    "@misk/core": "0.0.71",
    "@misk/dev": "0.0.57",
    "@misk/tslint": "0.0.8",
    date: "2018-11-02 ",
    notes: ""
  },
  "0.0.1": {
    "@misk/cli": "     ",
    "@misk/common": "0.0.52",
    "@misk/core": "0.0.68",
    "@misk/dev": "0.0.46",
    "@misk/tslint": "0.0.7",
    date: "2018-10-26 ",
    notes: ""
  }
}

export const JsonOptions = { spaces: 2 }

export const log = console.log
export const logError = (s: string) => log(emoji.emojify(chalk.bold.red(s)))
export const logInfo = (s: string) => log(emoji.emojify(chalk.bold(s)))
export const logDetail = (s: string) => log(emoji.emojify(chalk.dim(s)))

export const cmdFromArgs = (exec: string) => {
  const args = process.argv
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
  // logInfo("Now running: $ ${cmd}")
  // runCmd(cmd)
}
