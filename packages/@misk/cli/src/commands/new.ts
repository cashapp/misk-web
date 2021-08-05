import path from "path"
import { cwd } from "process"
import nodePlop from "node-plop"
import { handleCommand, logDebug, parseArgs } from "../utils"

export const command = "new <titleCase> <slugCase>"
export const desc =
  'create a new tab in the current directory\n<titleCase> title space case name of new tab, surround with quotes (ex. "Alpha Bravo")\n<slugCase> slug case name of new tab, surround with quotes (ex. "alpha-bravo")\n'
export const handlerFn = async (...args: any) => {
  const cmd = "new"
  const { rawArgs } = parseArgs(...args)
  const { titleCase, slugCase } = rawArgs[0]

  logDebug(cmd, desc)
  
  const plop = nodePlop(path.join(__dirname, "../../../plopfile.js"), {
    destBasePath: cwd(),
    force: false
  })
  const generator = plop.getGenerator("basic");
  generator.runActions({
    // This isn't needed (we can title-case a name ourselves), but keeps the command's behaviour the 
    // same. This should be removed in a future version.
    titleCaseName: titleCase,
    name: slugCase
  }).then(value => {
    console.info(value.changes, value.failures)
  }).catch(error => {
    console.error(error)
  })
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
