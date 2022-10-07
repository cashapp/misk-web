import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "build"
export const desc = "run a fast Webpack development build\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript(command, true), ...args)
  return Promise.resolve()
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
