import * as fs from "fs-extra"
import {
  logDebug,
  handleCommand,
  parseArgs,
  makePath,
  readMiskTabJson,
  generateMiskTabJson,
  Files,
  packageVersionExistsOnNPM,
  offlineOrNotFoundMessage,
  npmRunScript,
  execute
} from "../utils"
export const command = "auto-pin [filename]"
export const desc =
  "auto-pin searches upstream for a [filename] (default: master-dependencies.json) and uses the pinned version in key `miskWebNPM` for all tab Misk Web dependencies\n"
export const positional = (yargs: any): any => {
  yargs.positional("filename", {
    describe:
      "JSON filename where a key miskWebNPM points to a published Misk Web version.",
    type: "string"
  })
}
export const handlerFn = async (...args: any) => {
  const { dir, rawArgs } = parseArgs(...args)
  const versionFile = rawArgs[0].filename || Files.masterDependencies
  let searchDir = dir
  while (!fs.existsSync(makePath(searchDir, versionFile)) && searchDir !== "") {
    const pathArr = searchDir.split("/")
    pathArr.pop()
    searchDir = pathArr.join("/")
  }

  if (fs.existsSync(makePath(searchDir, versionFile))) {
    const masterDepsPath = makePath(searchDir, versionFile)
    const masterDeps = fs.readJSONSync(masterDepsPath)
    if ("miskWebNPM" in masterDeps) {
      const miskTab = readMiskTabJson(dir)
      const versionExistsOnNPM = await packageVersionExistsOnNPM(
        masterDeps.miskWebNPM
      )
      if (versionExistsOnNPM) {
        logDebug(
          "AUTO-PIN",
          `Pin to Misk Web @ ${masterDeps.miskWebNPM} from ${masterDepsPath}`
        )
      } else {
        logDebug(
          "AUTO-PIN",
          offlineOrNotFoundMessage(
            "Pin to",
            masterDeps.miskWebNPM,
            ` from ${masterDepsPath}.`
          )
        )
      }
      generateMiskTabJson(dir, { ...miskTab, version: masterDeps.miskWebNPM })
      execute(npmRunScript("prebuild", true), ...args)
    } else {
      logDebug(
        "AUTO-PIN",
        `[ERROR] Missing miskWebNPM key in ${masterDepsPath}`
      )
    }
  } else {
    logDebug(
      "AUTO-PIN",
      "[ERROR] No master-dependencies.json could be found in the upstream directories"
    )
  }
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
