import axios from "axios"
import { chain, isNaN, isNumber } from "lodash"
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { version: packageVersion } = require("root-require")("package.json") 
import { MiskPkg, logDebug } from "../utils"

export const offlineOrNotFoundMessage = (
  verb: string,
  version: string,
  fromLocation = ""
) =>
  `\n[WARN] ${verb} unconfirmed Misk Web @ ${version} ${fromLocation}.\nmiskweb is offline or cannot find v(${version}) published on NPM.`

/** WARN: This only works with packages names that are in a scoped NPM organization and thus start with `@`. Ex. `@misk/core`. */
export const parseAtPkgVersionFromNpmUrl = (url: string) =>
  url.split("@")[2].split("/")[0]

export enum PackageVersionStatus {
  "NOT_FOUND",
  "OFFLINE"
}

export const packageVersionExistsOnNPM = async (
  version?: string,
  pkg: string = MiskPkg.core
) => {
  try {
    return parseAtPkgVersionFromNpmUrl(
      (await axios.get(
        version
          ? `https://unpkg.com/${pkg}@${version}`
          : `https://unpkg.com/${pkg}`
      )).request.path
    )
  } catch (e) {
    if (e.code === "ENOTFOUND") {
      return PackageVersionStatus.OFFLINE
    }
    return PackageVersionStatus.NOT_FOUND
  }
}

export const isSemVar = (version: string) =>
  !isNaN(
    parseInt(
      chain(version)
        .replace(".", "")
        .replace("-", "")
        .value()
    )
  ) &&
  isNumber(
    parseInt(
      chain(version)
        .replace(".", "")
        .replace("-", "")
        .value()
    )
  )

export const versionResolver = (
  version: string,
  onlineVersionResult: PackageVersionStatus | string,
  packageVersion: string,
  packageName?: string
) => {
  const resolvedVersion = isSemVar(version) ? version : packageVersion
  const fallback = `\nFalling back to miskweb shipped version ${resolvedVersion}.`
  switch (onlineVersionResult) {
    case PackageVersionStatus.NOT_FOUND:
      logDebug(
        "Warn",
        `Cannot resolve ${packageName}@${version} on NPM. ${
          version === resolvedVersion ? "" : fallback
        }`
      )
      return resolvedVersion
    case PackageVersionStatus.OFFLINE:
      logDebug(
        "Warn",
        `miskweb is offline.\nCannot resolve ${packageName}@${version} on NPM. ${
          version === resolvedVersion ? "" : fallback
        }`
      )
      return resolvedVersion
    default:
      return onlineVersionResult
  }
}

export const getSemVarPackageVersionOnNPM = async (
  version?: string,
  pkg: string = MiskPkg.core
): Promise<string> => {
  const onlineVersion = await packageVersionExistsOnNPM(version, pkg)
  return versionResolver(version, onlineVersion, packageVersion, pkg)
}
