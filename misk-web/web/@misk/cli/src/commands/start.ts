import { prebuild } from "../commands"
import { runCmd } from "../utils"

export const command = "start"
export const desc = "start webpack development server"

export async function handler() {
  console.log("[START]")
  await prebuild()
  runCmd("sh -c 'npm run-script start'")
}
