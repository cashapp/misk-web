import { prebuild } from "./"
import { runCmd } from "../utils"

export const command = "build"
export const desc = "run webpack production build"

export async function handler() {
  await prebuild()
  console.log("[BUILD]")
  runCmd("sh -c 'npm run-script build'")
}
