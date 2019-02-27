import { execute, handleCommand, prebuild } from "../utils"
export const command = "lint"
export const desc = "lint all files"
export const handlerFn = async (...args: any) => {
  prebuild(...args)
  console.log("[LINT]")
  execute("npm run-script lint", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
