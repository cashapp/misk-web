import { cmdHeader, execute, handleCommand, npmRunScript } from "../utils"
export const command = "build"
export const desc = "run a fast webpack development build"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  execute(npmRunScript(command, true), ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
