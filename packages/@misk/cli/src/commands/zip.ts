import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "zip"
export const desc = "zip source code for tab\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript(command), ...args)
  return Promise.resolve()
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
