import { generateBuildFiles, migrate } from "../utils"

export const command = "prebuild"
export const desc = "consume miskTab.json and write necessary build files"

export async function handler() {
  try {
    console.log("[PREBUILD]")
    await migrate().catch(e =>
      console.log(`[ERROR] Migrating miskTab failed. ${e}`)
    )
    console.log("[PREBUILD] Generating up to date build files")
    generateBuildFiles().catch(e =>
      console.log(`[ERROR] Generating up to date build files failed. ${e}`)
    )
  } catch (e) {
    console.log(`[ERROR] Generating up to date build files failed. ${e}`)
  }
}
