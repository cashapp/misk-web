import { logDebug, execute, handleCommand } from "../utils"
export const command = "install"
export const desc = "install node_modules dependencies\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute("npm install", ...args)
  return Promise.resolve()
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
