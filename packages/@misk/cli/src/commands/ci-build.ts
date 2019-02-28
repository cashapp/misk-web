import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "ci-build"
export const desc = "npm install, then clean webpack production build"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript(command, true), ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
