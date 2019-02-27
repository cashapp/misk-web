import { execute, handleCommand, prebuild } from "../utils"
export const command = "zip"
export const desc = "zip source code for tab"
export const handlerFn = async (...args: any) => {
  prebuild(...args)
  console.log("[ZIP]")
  execute("npm run-script zip", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
