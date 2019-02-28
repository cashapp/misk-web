import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "clean"
export const desc = "remove lib directory and other temporary files"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript(command, true), ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
