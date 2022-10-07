import { logDebug, execute, handleCommand, npmRunScript } from "../utils"
export const command = "test-coverage"
export const desc = "generate test coverage report\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  execute(npmRunScript("test -- --coverage", true), ...args)
  return Promise.resolve()
}
export const handler = async (yargs: any) => handleCommand(yargs, handlerFn)
