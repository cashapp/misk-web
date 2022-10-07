import { logDebug, execute, handleCommand } from "../utils"
export const command = "update"
export const desc = "update Misk Web CLI\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc, "NPM")
  execute("npm install -g @misk/cli", ...args)
  return Promise.resolve()
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn, ["e", "each"])
