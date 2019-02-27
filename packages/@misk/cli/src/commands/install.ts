import { cmdHeader, execute, handleCommand } from "../utils"
export const command = "install"
export const desc = "install node_modules dependencies"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  execute("npm install", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
