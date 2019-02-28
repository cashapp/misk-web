import { cmdHeader, generateBuildFiles, handleCommand, migrateBuildFiles } from "../utils"
export const command = "prebuild"
export const desc = "consume miskTab.json and write necessary build files"
export const handlerFn = async (...args: any) => {
  try {
    cmdHeader(command)
    await migrateBuildFiles(...args).catch(e => {
      throw new Error(`Migrating miskTab failed. ${e}`)
    })
    console.log("[PREBUILD] Generating up to date build files")
    await generateBuildFiles(...args).catch(e => {
      throw new Error(`Generating up to date build files failed. ${e}`)
    })
  } catch (e) {
    console.log(`[ERROR] Prebuild failed. ${e}`)
  }
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
