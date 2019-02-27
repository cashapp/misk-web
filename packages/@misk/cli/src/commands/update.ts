import { cmdHeader, execute, handleCommand } from "../utils"
export const command = "update"
export const desc = "update miskweb CLI"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  execute("npm install -g @misk/cli", ...args)
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
