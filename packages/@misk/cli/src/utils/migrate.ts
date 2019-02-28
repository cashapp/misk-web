/**
 * Utilities to migrate from old manually managed build files to `miskTab.json` + @misk/cli driven builds
 */

import * as fs from "fs-extra"
import { Files, IMiskTabJSON, JsonOptions } from "../utils"
import { MiskVersion } from "./changelog"

const moveOldBuildFile = async (dir: string, filename: Files) => {
  if (await fs.existsSync(`${dir}/${filename}`)) {
    fs.move(`${dir}/${filename}`, `${dir}/${Files.old}/${filename}`)
  }
}

const removeOldBuildFile = async (dir: string, filename: Files) => {
  if (await fs.existsSync(`${dir}/${filename}`)) {
    fs.remove(`${dir}/${filename}`)
  }
}

export const migrateBuildFiles = async (...args: any) => {
  const dir = args[0]
  console.log(
    "[MIGRATE] Verify valid build files or migrate old build files to new miskweb generated build files"
  )
  let pkgMiskTab: IMiskTabJSON
  if (await fs.existsSync(`${dir}/${Files.package}`)) {
    const pkg = await fs.readJson(`${dir}/${Files.package}`)
    if (pkg.name.startsWith("@misk/")) {
      throw Error(
        "miskweb CLI build file generation will not be done on @misk/ packages which have custom build tools."
      )
    }
    pkgMiskTab = pkg.miskTab ? pkg.miskTab : null
  } else {
    pkgMiskTab = null
  }

  if (pkgMiskTab && (await fs.existsSync(`${dir}/${Files.miskTab}`))) {
    // miskTab.json and package with miskTab exists
    throw Error(
      "[MIGRATE] Remove existing miskTab.json OR remove miskTab block from existing package.json."
    )
  } else if (!pkgMiskTab && (await fs.existsSync(`${dir}/${Files.miskTab}`))) {
    console.log("[MIGRATE] miskTab.json exists. No migration required.")
  } else if (pkgMiskTab && !(await fs.existsSync(`${dir}/${Files.miskTab}`))) {
    // TODO Add type enforcement that it is valid IMiskTabJSON
    const normalizedMiskTab: IMiskTabJSON = {
      output_path: `lib/web/_tab/${pkgMiskTab.slug}`,
      port: 4242,
      version: MiskVersion.latest,
      zipOnBuild: false,
      ...pkgMiskTab
    }
    fs.writeJson(`${dir}/${Files.miskTab}`, normalizedMiskTab, JsonOptions)
    // move all build files to an .old-build-files folder
    console.log(`[MIGRATE] Stashing old build files in ${dir}/${Files.old}`)
    await fs.mkdirp(`${dir}/${Files.old}`)
    fs.copy(`${dir}/${Files.package}`, `${dir}/${Files.old}/${Files.package}`)
    moveOldBuildFile(dir, Files.gitignore)
    moveOldBuildFile(dir, Files.prettier)
    moveOldBuildFile(dir, Files.tsconfig)
    moveOldBuildFile(dir, Files.tslint)
    moveOldBuildFile(dir, Files.webpack)
    removeOldBuildFile(dir, Files.packageLock)
    removeOldBuildFile(dir, Files.yarnLock)
  } else if (!pkgMiskTab && !(await fs.existsSync(`${dir}/${Files.miskTab}`))) {
    throw Error(
      "[MIGRATE] No miskTab.json present and no miskTab block in existing package.json. miskweb CLI build file generation will not be attempted."
    )
  }
}
