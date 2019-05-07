import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "start"
export const desc = "start Webpack Dev Server for live editing"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript(command, true), ...args)
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
