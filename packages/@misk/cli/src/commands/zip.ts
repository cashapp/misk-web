import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "zip"
export const desc = "zip source code for tab"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript(command), ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
