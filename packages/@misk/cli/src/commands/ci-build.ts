import { execute, handleCommand, prebuild } from "../utils"
export const command = "ci-build"
export const desc = "run a fast, clean, webpack production build"
export const handlerFn = async (...args: any) => {
  prebuild(...args)
  console.log("[CI-BUILD]")
  execute("npm run-script ci-build", ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
