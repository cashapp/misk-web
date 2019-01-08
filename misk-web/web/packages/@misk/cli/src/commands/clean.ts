import { runCmd } from "../utils"

export const command = "clean"
export const desc = "remove build directory and other temporary files"

export async function handler() {
  console.log("[CLEAN]")
  runCmd("sh -c 'npm run-script clean'")
}
