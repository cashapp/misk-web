import { versionResolver, PackageVersionStatus } from "../../src/utils"

const MISK_TAB_LATEST = "latest"
const MISK_TAB_VERSION = "0.1.0"
const NPM_LATEST = "0.1.9"
const LOCAL_CLI_PACKAGE_VERSION = "0.1.5"

describe("Test versionResolver logic to ensure SemVer version always returned", () => {
  it("Online valid SemVer version returns itself", async () => {
    expect(
      versionResolver(
        MISK_TAB_VERSION,
        MISK_TAB_VERSION,
        LOCAL_CLI_PACKAGE_VERSION
      )
    ).toBe(MISK_TAB_VERSION)
  })
  it("Online version set as latest resolves to online SemVer version", async () => {
    expect(
      versionResolver(MISK_TAB_LATEST, NPM_LATEST, LOCAL_CLI_PACKAGE_VERSION)
    ).toBe(NPM_LATEST)
  })
  it("Offline SemVer version returns itself", async () => {
    expect(
      versionResolver(
        MISK_TAB_VERSION,
        PackageVersionStatus.OFFLINE,
        LOCAL_CLI_PACKAGE_VERSION
      )
    ).toBe(MISK_TAB_VERSION)
  })
  it("Offline latest version returns CLI version", async () => {
    expect(
      versionResolver(
        MISK_TAB_LATEST,
        PackageVersionStatus.OFFLINE,
        LOCAL_CLI_PACKAGE_VERSION
      )
    ).toBe(LOCAL_CLI_PACKAGE_VERSION)
  })
})
