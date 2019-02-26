import { execute, handleCommand, prebuild } from "../utils"
export const command = "clean"
export const desc = "remove build directory and other temporary files"
export const handlerFn = async (...args: any) => {
  prebuild(...args)
  console.log("[CLEAN]")
  execute("npm run-script clean", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
