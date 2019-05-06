import { logDebug, execute, handleCommand } from "../utils"
export const command = "update"
export const desc = "update Misk Web CLI"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute("npm install -g @misk/cli", ...args)
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
