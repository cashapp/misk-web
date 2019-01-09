import { prebuild } from "./"
import { runCmd } from "../utils"

export const command = "zip"
export const desc = "zip source code for tab"

export async function handler() {
  await prebuild()
  console.log("[ZIP]")
  runCmd("sh -c 'npm run-script zip'")
}
