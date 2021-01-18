const createTabWebpack = require("./webpack.config.tab")
const vscodeExtensions = require("./vscode.extensions")
const vscodeSettings = require("./vscode.settings")
const {
  createExternals,
  vendorExternals,
  miskExternals,
} = require("./externals")
module.exports = {
  createTabWebpack,
  vscodeExtensions,
  vscodeSettings,
  createExternals,
  vendorExternals,
  miskExternals,
}
