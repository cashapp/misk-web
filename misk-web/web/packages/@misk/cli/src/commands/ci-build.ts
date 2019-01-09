import { prebuild } from "./"
import { runCmd } from "../utils"

export const command = "ci-build"
export const desc = "run a fast, clean, webpack production build"

export async function handler() {
  await prebuild()
  console.log("[CI-BUILD]")
  runCmd("sh -c 'npm run-script ci-build'")
}
