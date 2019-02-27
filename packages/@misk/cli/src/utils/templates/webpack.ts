import { generatedByCLI } from "../templates"

export const webpack = `const { createTabWebpack } = require("@misk/dev")
const path = require("path")
const miskTab = require(path.join(process.cwd(), "miskTab.json"))
module.exports = createTabWebpack(process.env.NODE_ENV, {
  dirname: __dirname,
  miskTab
})
${generatedByCLI}
`
