import { cmdHeader, execute, handleCommand, prebuild } from "../utils"
export const command = "build"
export const desc = "run a fast webpack development build"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  prebuild(...args)
  execute("npm run-script build", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
