import { isSemVar, parseAtPkgVersionFromNpmUrl } from "../../src/utils"

describe("Test parseVersionFromNpmUrl ability to parse out SemVar version from unpkg.com URL", () => {
  // Set longer timeout since we're actually doing network calls
  jest.setTimeout(15000)

  it("https://unpkg.com/@misk/core@2/lib/", () => {
    expect(
      isSemVar(
        parseAtPkgVersionFromNpmUrl("https://unpkg.com/@misk/core@2/lib/")
      )
    ).toBeTruthy()
  })
  it("https://unpkg.com/@misk/core@0.1/lib/", () => {
    expect(
      isSemVar(
        parseAtPkgVersionFromNpmUrl("https://unpkg.com/@misk/core@0.1/lib/")
      )
    ).toBeTruthy()
  })
  it("https://unpkg.com/@misk/core@0.1.3/lib/", () => {
    expect(
      isSemVar(
        parseAtPkgVersionFromNpmUrl("https://unpkg.com/@misk/core@0.1.3/lib/")
      )
    ).toBeTruthy()
  })
  it("https://unpkg.com/@misk/core@0.1.5-35/lib/", () => {
    expect(
      isSemVar(
        parseAtPkgVersionFromNpmUrl(
          "https://unpkg.com/@misk/core@0.1.5-35/lib/"
        )
      )
    ).toBeTruthy()
  })
  it("https://unpkg.com/@misk/core@0.1.5-35/lib/", () => {
    expect(
      isSemVar(
        parseAtPkgVersionFromNpmUrl(
          "https://unpkg.com/@misk/core@0.1.5-alpha-3/lib/"
        )
      )
    ).toBeTruthy()
  })
  it("https://unpkg.com/unsupported@0.1.5-35/lib/", () => {
    const testFail = () => {
      try {
        return isSemVar(
          parseAtPkgVersionFromNpmUrl(
            "https://unpkg.com/unsupported@0.1.5-alpha-3/lib/"
          )
        )
      } catch (e) {
        return false
      }
    }
    expect(testFail()).toBeFalsy()
  })
  it("https://unpkg.com/unsupported/core@0.1.5-35/lib/", () => {
    const testFail = () => {
      try {
        return isSemVar(
          parseAtPkgVersionFromNpmUrl(
            "https://unpkg.com/unsupported/core@0.1.5-alpha-3/lib/"
          )
        )
      } catch (e) {
        return false
      }
    }
    expect(testFail()).toBeFalsy()
  })
})
