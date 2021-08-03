// import path from "path"
import nodePlop from "node-plop"
// import { Plop, run } from "plop"
import { handleCommand, logDebug, parseArgs } from "../utils"

export const command = "new <slugCase>"
export const desc =
  'create a new tab in the current directory\n<slugCase> slug case name of new tab, surround with quotes (ex. "alpha-bravo")\n'
export const handlerFn = async (...args: any) => {
  const cmd = "new"
  const { rawArgs } = parseArgs(...args)
  const { slugCase } = rawArgs[0]

  logDebug(cmd, desc)
  
  const plop = nodePlop("plopfile.js")
  const generator = plop.getGenerator("basic");
  generator.runActions({
    name: slugCase
  }).then(value => {
    console.info(value.changes, value.failures)
  }).catch(error => {
    console.error(error)
  })
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
