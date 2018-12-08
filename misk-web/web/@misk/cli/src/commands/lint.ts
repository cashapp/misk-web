import { prebuild } from "../commands"
import { runCmd } from "../utils"

export const command = "lint"
export const desc = "lint all files"

export async function handler() {
  console.log("[LINT]")
  await prebuild()
  runCmd("sh -c 'npm run-script lint'")
}
