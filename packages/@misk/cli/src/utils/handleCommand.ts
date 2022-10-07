import klaw from "klaw"
import path from "path"
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const ProgressBar = require("progress")
import { cd } from "shelljs"
import yargs from "yargs"
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { version: packageVersion } = require("root-require")("package.json")
import {
  packageVersionExistsOnNPM,
  logDebug as formattedLog,
  execute
} from "../utils"
import { PackageVersionStatus } from "./resolveNpmVersion"

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

export const autoUpdate = async () => {
  const latestOnlineVersion = await packageVersionExistsOnNPM()
  if (
    packageVersion !== latestOnlineVersion &&
    latestOnlineVersion !== PackageVersionStatus.OFFLINE
  ) {
    formattedLog(
      "Auto-Update",
      `updating miskweb CLI from ${packageVersion} to ${latestOnlineVersion ||
        "latest"}`,
      "NPM"
    )
    execute("npm install -g @misk/cli")
  }
}

export const handleCommand = async (
  args: {
    _: string[]
    e: boolean
    each: boolean
    $0: string
    hideProgress: boolean
  },
  handlerFn: (...args: any) => Promise<void>,
  blockedOptions: string[] = []
) => {
  // Node version check
  const { node: nodeVersion } = process.versions
  if (parseInt(nodeVersion.split(".")[0]) < 10) {
    formattedLog(
      "Warn",
      `Node version is ${nodeVersion}. Recommended is 10.13 LTS or above.`,
      "Node"
    )
  }
  const latestOnlineVersion = await packageVersionExistsOnNPM()

  // CLI version check
  if (
    packageVersion !== latestOnlineVersion &&
    latestOnlineVersion !== PackageVersionStatus.OFFLINE
  ) {
    console.log(
      `[ALERT] Upgrade miskweb CLI from ${packageVersion} to ${latestOnlineVersion ||
        "latest"} with '$ miskweb update'`
    )
  }

  // Blocked options (ie. not allowing -e on miskweb start)
  const invalidOptions: string[] = []
  blockedOptions.map((opt: string) => {
    if (opt in args) {
      invalidOptions.push(opt)
    }
  })

  // Execute command
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
    // Find all downstream tabs and execute command in that tab directory
    let bar: any = null
    if (!args.hideProgress) {
      bar = new ProgressBar(`[EACH][:bar]`, {
        complete: "=",
        incomplete: " ",
        width: 80,
        total: 10
      })
    }

    const tabs: string[] = []
    klaw(".", { filter: filterFunc })
      .on("data", (item: any) => {
        if (item.stats.isFile() && item.path.includes("/miskTab.json")) {
          if (!args.hideProgress && tabs.length < 10) bar.tick(1)
          tabs.push(item.path.split("/miskTab.json")[0])
        }
      })
      .on("error", (err: Error) => console.error(err))
      .on("end", () => { 
        void (async () => {
          if (!args.hideProgress) bar.tick(10 - tabs.length)
          for (const tab of tabs) {
            cd(tab)
            await handlerFn({ ...args, dir: tab })
          }
        })()
      })
  } else {
    // Execute command in current directory
    await handlerFn(args)
  }
}
