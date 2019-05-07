import {
  logDebug,
  generateMiskTabJson,
  handleCommand,
  parseArgs,
  readMiskTabJson
} from "../utils"
export const command = "path <pathToTab>"
export const desc =
  "set relative URL path where tab will be served in browser. Especially useful if your tab is not part of Misk Admin Dashboard but is just a Misk Web frontend."
export const positional = (yargs: any): any => {
  yargs.positional("pathToTab", {
    describe: "set path where tab will be served in browser",
    type: "string"
  })
}
export const handlerFn = async (...args: any) => {
  const { dir, rawArgs } = parseArgs(...args)
  const { pathToTab } = rawArgs[0]
  let normalizedPath = pathToTab
  if (normalizedPath.startsWith("/")) {
    normalizedPath = normalizedPath.substring(1)
  }
  if (normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.slice(0, -1)
  }
  const miskTab = readMiskTabJson(dir)
  logDebug(
    "PATH",
    `path set to /${normalizedPath}/.
If using ${miskTab.slug} with Misk, make sure to update your multibindings.
Generate new ones with $ miskweb misk`
  )
  generateMiskTabJson(dir, {
    ...miskTab,
    relative_path_prefix: `${normalizedPath}/`,
    output_path: `lib/web/${normalizedPath}`
  })
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
