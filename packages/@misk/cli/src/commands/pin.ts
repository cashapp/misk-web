import {
  logDebug,
  generateMiskTabJson,
  handleCommand,
  parseArgs
} from "../utils"
export const command = "pin <pinnedVersion>"
export const desc = "pin version for all Misk Web dependencies"
export const positional = (yargs: any): any => {
  yargs.positional("pinnedVersion", {
    describe:
      "a Misk Web release version. All Misk-Web dependencies in your tab will use this version in package.json",
    type: "string"
  })
}
export const handlerFn = async (...args: any) => {
  const { dir, rawArgs } = parseArgs(...args)
  const { pinnedVersion } = rawArgs[0]
  logDebug("PIN", `pin ${pinnedVersion} for all Misk Web dependencies`)
  generateMiskTabJson(dir, { version: pinnedVersion })
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
