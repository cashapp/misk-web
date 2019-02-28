import { cmdHeader, execute, handleCommand, npmRunScript } from "../utils"
export const command = "lint"
export const desc = "use prettier to lint all files"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  execute(npmRunScript(command, true), ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
