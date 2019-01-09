/**
 * Utilities to migrate from old manually managed build files to `miskTab.json` + @misk/cli driven builds
 */

import * as fs from "fs-extra"
import { Files, IMiskTabJSON, JsonOptions } from "../utils"
import { MiskVersion } from "./changelog"

const moveOldBuildFile = async (filename: Files) => {
  if (await fs.existsSync(filename)) {
    fs.move(filename, `${Files.old}/${filename}`)
  }
}

const removeOldBuildFile = async (filename: Files) => {
  if (await fs.existsSync(filename)) {
    fs.remove(filename)
  }
}

export const migrate = async () => {
  console.log(
    "[MIGRATE] Verify valid build files or migrate old build files to new miskweb generated build files"
  )
  let pkgMiskTab: IMiskTabJSON
  if (await fs.existsSync(Files.package)) {
    const pkg = await fs.readJson(Files.package)
    if (pkg.name.startsWith("@misk/")) {
      throw Error(
        "miskweb CLI build file generation will not be done on @misk/ packages which have custom build tools."
      )
    }
    pkgMiskTab = pkg.miskTab ? pkg.miskTab : null
  } else {
    pkgMiskTab = null
  }

  if (pkgMiskTab && (await fs.existsSync(Files.miskTab))) {
    // miskTab.json and package with miskTab exists
    throw Error(
      "[MIGRATE] Remove existing miskTab.json OR remove miskTab block from existing package.json."
    )
  } else if (!pkgMiskTab && (await fs.existsSync(Files.miskTab))) {
    console.log("[MIGRATE] miskTab.json exists. No migration required.")
  } else if (pkgMiskTab && !(await fs.existsSync(Files.miskTab))) {
    // TODO Add type enforcement that it is valid IMiskTabJSON
    const normalizedMiskTab: IMiskTabJSON = {
      output_path: `lib/web/_tab/${pkgMiskTab.slug}`,
      port: 4242,
      version: MiskVersion.latest,
      zipOnBuild: false,
      ...pkgMiskTab
    }
    fs.writeJson(Files.miskTab, normalizedMiskTab, JsonOptions)
    // move all build files to an .old-build-files folder
    console.log(`[MIGRATE] Stashing old build files in ./${Files.old}`)
    await fs.mkdirp(Files.old)
    fs.copy(Files.package, `${Files.old}/${Files.package}`)
    moveOldBuildFile(Files.gitignore)
    moveOldBuildFile(Files.prettier)
    moveOldBuildFile(Files.tsconfig)
    moveOldBuildFile(Files.tslint)
    moveOldBuildFile(Files.webpack)
    removeOldBuildFile(Files.packageLock)
    removeOldBuildFile(Files.yarnLock)
  } else if (!pkgMiskTab && !(await fs.existsSync(Files.miskTab))) {
    throw Error(
      "[MIGRATE] No miskTab.json present and no miskTab block in existing package.json. miskweb CLI build file generation will not be attempted."
    )
  }
}
