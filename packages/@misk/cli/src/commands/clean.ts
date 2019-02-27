import { cmdHeader, execute, handleCommand, prebuild } from "../utils"
export const command = "clean"
export const desc = "remove lib directory and other temporary files"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  prebuild(...args)
  execute("npm run-script clean", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
