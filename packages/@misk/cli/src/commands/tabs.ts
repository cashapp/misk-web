import { execute, handleCommand } from "../utils"
export const command = "tabs"
export const desc = "prints path of all downstream tabs\n"
export const handlerFn = async (...args: any) => {
  execute("pwd", ...args)
}
export const handler = async (yargs: any) =>
  handleCommand({ ...yargs, each: true, hideProgress: true }, handlerFn)
