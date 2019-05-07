import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "lint"
export const desc = "use prettier to lint all files\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript(command, true), ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
