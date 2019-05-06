import {
  logDebug,
  generateMiskTabJson,
  handleCommand,
  parseArgs
} from "../utils"
export const command = "pin <pinnedVersion>"
export const desc = "set version for all Misk Web dependencies"
export const positional = (yargs: any): any => {
  yargs.positional("pinnedVersion", {
    describe: "pin a specific version for all Misk Web dependencies",
    type: "string"
  })
}
export const handlerFn = async (...args: any) => {
  logDebug("PIN", desc)
  const { dir, rawArgs } = parseArgs(...args)
  generateMiskTabJson(dir, { version: rawArgs[0].pinnedVersion })
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
