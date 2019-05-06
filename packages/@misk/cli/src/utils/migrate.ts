/**
 * Utilities to migrate from old manually managed build files to `miskTab.json` + @misk/cli driven builds
 */

import * as fs from "fs-extra"
import {
  Files,
  IMiskTabJSON,
  JsonOptions,
  logDebug,
  logFormatter,
  remove,
  path,
  parseArgs,
  defaultMiskTabJson
} from "../utils"
import { MiskVersion } from "./changelog"

const tag = "migrate"

const moveOldBuildFile = async (dir: string, filename: Files) => {
  if (await fs.existsSync(path(dir, filename))) {
    fs.move(path(dir, filename), path(dir, Files.old, filename))
  }
}

export const migrateBuildFiles = (...args: any) => {
  const { dir } = parseArgs(...args)
  logDebug(tag, "", dir)
  // Verify valid build files or migrate old build files to new miskweb generated build files
  let pkgMiskTab: IMiskTabJSON = null

  // Use existing package.json field if it exists
  if (fs.existsSync(path(dir, Files.package))) {
    let pkg = null
    try {
      // This fails if file doesn't exist || invalid JSON parse
      pkg = fs.readJsonSync(path(dir, Files.package))
    } catch (e) {
      // If it's invalid, remove it
      fs.removeSync(path(dir, Files.package))
    }

    if (pkg && "name" in pkg && pkg.name.startsWith("@misk/")) {
      throw Error(
        logFormatter(
          tag,
          `Build file generation will not be done on @misk/ packages which have custom build tools.`,
          dir
        )
      )
    }
    pkgMiskTab = pkg && "miskTab" in pkg ? pkg.miskTab : null
  }
  if (pkgMiskTab && fs.existsSync(path(dir, Files.miskTab))) {
    // miskTab.json and package with miskTab exists
    throw Error(
      logFormatter(
        tag,
        `Automatic migration failed. miskweb doesn't know whether to use miskTab.json or the miskTab block in package.json. You must remove the miskTab.json file OR remove the miskTab block from package.json.`,
        dir
      )
    )
  } else if (!pkgMiskTab && fs.existsSync(path(dir, Files.miskTab))) {
    // miskTab.json exists. Rewrite out with alphabetically sorted and up to date set of keys.
    const miskTab = fs.readJSONSync(path(dir, Files.miskTab))
    fs.writeJsonSync(
      path(dir, Files.miskTab),
      {
        ...defaultMiskTabJson,
        ...miskTab
      },
      { spaces: 2 }
    )
  } else if (pkgMiskTab && !fs.existsSync(path(dir, Files.miskTab))) {
    // TODO Add type enforcement that it is valid IMiskTabJSON
    const normalizedMiskTab: IMiskTabJSON = {
      output_path: `lib/web/_tab/${pkgMiskTab.slug}`,
      port: 4242,
      version: MiskVersion.latest,
      zipOnBuild: false,
      ...pkgMiskTab
    }
    fs.writeJson(path(dir, Files.miskTab), normalizedMiskTab, JsonOptions)
    // move all build files to an .old-build-files folder
    logDebug(tag, `Stashing old build files in ${path(dir, Files.old)}`)
    fs.mkdirp(path(dir, Files.old))
    fs.copy(path(dir, Files.package), path(dir, Files.old, Files.package))
    moveOldBuildFile(dir, Files.gitignore)
    moveOldBuildFile(dir, Files.prettier)
    moveOldBuildFile(dir, Files.tsconfig)
    moveOldBuildFile(dir, Files.tslint)
    moveOldBuildFile(dir, Files.webpack)
    remove(path(dir, Files.packageLock))
    remove(path(dir, Files.yarnLock))
  } else if (!pkgMiskTab && !fs.existsSync(path(dir, Files.miskTab))) {
    throw Error(
      logFormatter(
        tag,
        `No miskTab.json present and no miskTab block in existing package.json. miskweb CLI build file generation will not be attempted.`,
        dir
      )
    )
  }
}
