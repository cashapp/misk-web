import { generateBuildFiles, migrate } from "../utils"

export const command = "prebuild"
export const desc = "consume miskTab.json and write necessary build files"

export async function handler() {
  console.log("[PREBUILD]")
  await migrate()
  console.log("[PREBUILD] Generating up to date build files")
  generateBuildFiles()
}
