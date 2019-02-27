import { cmdHeader, execute, handleCommand, prebuild } from "../utils"
export const command = "lint"
export const desc = "use prettier to lint all files"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  prebuild(...args)
  execute("npm run-script lint", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
