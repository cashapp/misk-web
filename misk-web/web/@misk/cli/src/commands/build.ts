import { prebuild } from "../commands"
import { runCmd } from "../utils"

export const command = "build"
export const desc = "run webpack production build"

export async function handler() {
  console.log("[BUILD]")
  prebuild()
  runCmd("cross-env NODE_ENV=production webpack")
}
