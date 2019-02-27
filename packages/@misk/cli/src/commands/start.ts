import { cmdHeader, execute, handleCommand, prebuild } from "../utils"
export const command = "start"
export const desc = "start webpack development server for live editing"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  prebuild(...args)
  execute("npm run-script start", ...args)
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
