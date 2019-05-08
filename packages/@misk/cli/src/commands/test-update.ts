import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "test-update"
export const desc = "update test snapshots\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript("test -- -u", true), ...args)
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
