import { execute, handleCommand, prebuild } from "../utils"
export const command = "start"
export const desc = "start webpack development server"
export const handlerFn = async (...args: any) => {
  prebuild(...args)
  console.log("[START]")
  execute("npm run-script start", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
