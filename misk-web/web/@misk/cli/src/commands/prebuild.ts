import { generateBuildFiles, migrate } from "../utils"

export const command = "prebuild"
export const desc = "consume miskTab.json and write necessary build files"

export async function handler() {
  console.log(
    "[PREBUILD] Migrate if necessary old build files to new generated build files"
  )
  await migrate()
  console.log("[PREBUILD] Generate up to date build files")
  generateBuildFiles()
  console.log("[PREBUILD] Necessary build files generated")
}
