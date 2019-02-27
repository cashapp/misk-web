import { cmdHeader, execute, handleCommand, prebuild } from "../utils"
export const command = "ci-build"
export const desc = "npm install, then clean webpack production build"
export const handlerFn = async (...args: any) => {
  cmdHeader(command)
  prebuild(...args)
  execute("npm run-script ci-build", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
