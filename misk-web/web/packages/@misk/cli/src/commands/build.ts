import { execute, handleCommand, prebuild } from "../utils"
export const command = "build"
export const desc = "run webpack production build"
export const handlerFn = async (...args: any) => {
  prebuild(...args)
  console.log("[BUILD]")
  execute("npm run-script build", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
