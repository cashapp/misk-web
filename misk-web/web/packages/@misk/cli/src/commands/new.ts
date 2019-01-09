import { prebuild } from "./"
import { runCmd } from "../utils"

export const command = "new"
export const desc = "create a new tan"

export async function handler() {
  await prebuild()
  console.log("[NEW]")
  runCmd(
    "sh -c 'curl -s https://raw.githubusercontent.com/square/misk-web/master/new-tab/get-new-tab.sh | bash -s && ./new-tab.sh'"
  )
}
