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
  makePath,
  parseArgs,
  getSemVarPackageVersionOnNPM
} from "../utils"

const tag = "migrate"

const moveOldBuildFile = async (dir: string, filename: Files) => {
  if (await fs.existsSync(makePath(dir, filename))) {
    fs.move(makePath(dir, filename), makePath(dir, Files.old, filename))
  }
}

export const defaultMiskTabJson = async (
  slug?: string
): Promise<IMiskTabJSON> => ({
  name: "",
  output_path: `lib/web/_tab/${slug}`,
  port: 4242,
  rawGitginore: "",
  rawPackageJson: {},
  rawTsconfig: {},
  rawTslint: {},
  rawWebpackConfig: {},
  relative_path_prefix: "",
  slug: "",
  useWebpackExternals: true,
  version: await getSemVarPackageVersionOnNPM(),
  zipOnBuild: false,
  ___DeprecatedKeys:
    "Any keys below this point in your miskTab.json are deprecated and can be safely removed."
})

export const readMiskTabJson = (dir: string): IMiskTabJSON => {
  try {
    return fs.readJSONSync(makePath(dir, Files.miskTab))
  } catch (e) {
    console.log(
      `[FATAL] Failed to read ${dir}/${Files.miskTab}. Try this command in a tab directory.\n\n`,
      e
    )
    return process.exit()
  }
}

export const generateMiskTabJson = async (
  dir: string,
  newMiskTab?: IMiskTabJSON
) => {
  const miskTab = readMiskTabJson(dir)
  return fs.writeJsonSync(
    makePath(dir, Files.miskTab),
    {
      ...(await defaultMiskTabJson(miskTab.slug)),
      ...miskTab,
      ...newMiskTab
    },
    JsonOptions
  )
}

export const migrateBuildFiles = (...args: any) => {
  const { dir } = parseArgs(...args)
  logDebug(tag, "", dir)
  // Verify valid build files or migrate old build files to new miskweb generated build files
  let pkgMiskTab: IMiskTabJSON = null

  // Use existing package.json field if it exists
  if (fs.existsSync(makePath(dir, Files.package))) {
    let pkg = null
    try {
      // This fails if file doesn't exist || invalid JSON parse
      pkg = fs.readJsonSync(makePath(dir, Files.package))
    } catch (e) {
      // If it's invalid, remove it
      fs.removeSync(makePath(dir, Files.package))
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
  if (pkgMiskTab && fs.existsSync(makePath(dir, Files.miskTab))) {
    // miskTab.json and package with miskTab exists
    throw Error(
      logFormatter(
        tag,
        `Automatic migration failed. miskweb doesn't know whether to use miskTab.json or the miskTab block in package.json. You must remove the miskTab.json file OR remove the miskTab block from package.json.`,
        dir
      )
    )
  } else if (!pkgMiskTab && fs.existsSync(makePath(dir, Files.miskTab))) {
    // miskTab.json exists. Rewrite out with alphabetically sorted and up to date set of keys.
    generateMiskTabJson(dir)
  } else if (pkgMiskTab && !fs.existsSync(makePath(dir, Files.miskTab))) {
    generateMiskTabJson(dir, pkgMiskTab)
    // move all build files to an .old-build-files folder
    logDebug(tag, `Stashing old build files in ${makePath(dir, Files.old)}`)
    fs.mkdirp(makePath(dir, Files.old))
    fs.copy(
      makePath(dir, Files.package),
      makePath(dir, Files.old, Files.package)
    )
    moveOldBuildFile(dir, Files.gitignore)
    moveOldBuildFile(dir, Files.prettier)
    moveOldBuildFile(dir, Files.tsconfig)
    moveOldBuildFile(dir, Files.tslint)
    moveOldBuildFile(dir, Files.webpack)
    remove(makePath(dir, Files.packageLock))
    remove(makePath(dir, Files.yarnLock))
  } else if (!pkgMiskTab && !fs.existsSync(makePath(dir, Files.miskTab))) {
    throw Error(
      logFormatter(
        tag,
        `No miskTab.json present and no miskTab block in existing package.json. miskweb CLI build file generation will not be attempted.`,
        dir
      )
    )
  }
}
