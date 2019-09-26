import { execute, handleCommand, logDebug, parseArgs } from "../utils"
export const command = "new <titleCase> <slugCase>"
export const desc =
  'create a new tab in the current directory\n<titleCase> title space case name of new tab, surround with quotes (ex. "Alpha Bravo")\n<slugCase> slug case name of new tab, surround with quotes (ex. "alpha-bravo")\n'
export const handlerFn = async (...args: any) => {
  const cmd = "new"
  const { rawArgs } = parseArgs(...args)

  logDebug(cmd, desc)
  execute(
    "curl -s https://raw.githubusercontent.com/cashapp/misk-web/master/new-tab/get-new-tab.sh | bash -s",
    ...args
  )

  const { titleCase, slugCase } = rawArgs[0]
  logDebug(cmd, "New tab being created with")
  logDebug(cmd, `title: ${titleCase}`)
  logDebug(cmd, `slug: ${slugCase}`)

  execute(`./new-tab-starter-basic.sh "${titleCase}" "${slugCase}"`)
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
