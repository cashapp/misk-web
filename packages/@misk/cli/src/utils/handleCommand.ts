import klaw from "klaw"
import path from "path"
const ProgressBar = require("progress")
import { cd } from "shelljs"
import * as yargs from "yargs"
const { version: packageVersion } = require("root-require")("package.json")
import { packageVersionExistsOnNPM, logDebug, execute } from "../utils"
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
  const latestOnlineVersion = await packageVersionExistsOnNPM()
  if (
    packageVersion !== latestOnlineVersion &&
    latestOnlineVersion !== PackageVersionStatus.OFFLINE
  ) {
    console.log(
      `[ALERT] Upgrade miskweb CLI from ${packageVersion} to ${latestOnlineVersion ||
        "latest"} with '$ miskweb update'`
    )
  }
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
  if (
    packageVersion !== latestOnlineVersion &&
    latestOnlineVersion !== PackageVersionStatus.OFFLINE
  ) {
    logDebug(
      "Auto-Update",
      `updating miskweb CLI from ${packageVersion} to ${latestOnlineVersion ||
        "latest"}`,
      "NPM"
    )
    execute("npm install -g @misk/cli", args)
  }
}
