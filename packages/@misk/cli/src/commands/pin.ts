import {
  logDebug,
  generateMiskTabJson,
  handleCommand,
  parseArgs,
  readMiskTabJson,
  packageVersionExistsOnNPM,
  offlineOrNotFoundMessage,
} from "../utils"
export const command = "pin <pinnedVersion>"
export const desc =
  "pin version for all tab Misk Web dependencies\n<pinnedVersion> a Misk Web release version. All Misk-Web dependencies in your tab will use this version in package.json\n"
export const handlerFn = async (...args: any) => {
  const { dir, rawArgs } = parseArgs(...args)
  const { pinnedVersion } = rawArgs[0]
  const miskTab = readMiskTabJson(dir)
  const versionExistsOnNPM = await packageVersionExistsOnNPM(pinnedVersion)
  if (versionExistsOnNPM) {
    logDebug("PIN", `Pin to Misk Web @ ${versionExistsOnNPM}`)
  } else {
    logDebug("PIN", offlineOrNotFoundMessage("Pin to", pinnedVersion))
  }
  generateMiskTabJson(dir, {
    ...miskTab,
    version: versionExistsOnNPM || pinnedVersion,
  })
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
