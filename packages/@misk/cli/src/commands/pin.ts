import {
  logDebug,
  generateMiskTabJson,
  handleCommand,
  parseArgs,
  readMiskTabJson
} from "../utils"
export const command = "pin <pinnedVersion>"
export const desc = "pin version for all tab Misk Web dependencies\n"
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
  const miskTab = readMiskTabJson(dir)
  logDebug("PIN", `Pin to Misk Web @ ${pinnedVersion}`)
  generateMiskTabJson(dir, { ...miskTab, version: pinnedVersion })
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
