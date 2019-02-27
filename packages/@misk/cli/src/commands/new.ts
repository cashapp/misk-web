import { execute, handleCommand, prebuild } from "../utils"
export const command = "new"
export const desc = "create a new tab in the current directory"
export const handlerFn = async (...args: any) => {
  prebuild(...args)
  console.log("[NEW]")
  execute(
    "curl -s https://raw.githubusercontent.com/square/misk-web/master/new-tab/get-new-tab.sh | bash -s && ./new-tab.sh",
    ...args
  )
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
