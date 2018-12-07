/**
 * Utilities to migrate from old manually managed build files to `miskTab.json` + @misk/cli driven builds
 */

import { readFile, writeFile, IMiskTabJSON } from "../utils"

/**
 * Check for existence of old style package.json with a miskTab key block
 */
export const packageMiskTabExists = async () => {
  const pkg = await readFile("./package.json")
  if (pkg.miskTab) {
    return true
  }
  return false
}

export const migrate = async () => {
  const miskTab = await readFile("./miskTab.json")
  if (miskTab) {
    throw "[MIGRATE] Attempted to migrate existing miskTab block in package.json to miskTab.json but existing file found. Please remove existing miskTab.json file or the miskTab block in package.json and re-run command."
  } else {
    const pkg = await readFile("./package.json")
    if (pkg.miskTab) {
      // TODO Add type enforcement that it is valid IMiskTabJSON
      writeFile("./miskTab.json", pkg.miskTab)
      // move all build files to an .old-build-files folder
    } else {
      throw "[MIGRATE] No miskTab block found in existing package.json."
    }
  }
}
