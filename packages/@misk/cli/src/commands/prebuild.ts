import {
  logDebug,
  generateBuildFiles,
  handleCommand,
  migrateBuildFiles
} from "../utils"
export const command = "prebuild"
export const desc = "use miskTab.json to generate build files\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  migrateBuildFiles(...args)
  generateBuildFiles(...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
