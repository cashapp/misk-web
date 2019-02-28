import { cmdHeader, execute, handleCommand, npmRunScript } from "../utils"
export const command = "start"
export const desc = "start webpack development server for live editing"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  execute(npmRunScript(command, true), ...args)
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
