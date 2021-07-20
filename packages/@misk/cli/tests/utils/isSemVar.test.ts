import { isSemVar } from "../../src/utils"

describe("Test parseVersionFromNpmUrl ability to parse out SemVar version from unpkg.com URL", () => {
  it("SemVar checker code confirms valid SemVar", () => {
    expect(isSemVar("0.1.2")).toBeTruthy()
  })
  it("SemVar checker code confirms valid SemVar", () => {
    expect(isSemVar("0.1.2-alpha")).toBeTruthy()
  })
  it("SemVar checker code fails on invalid SemVar", () => {
    expect(isSemVar("latest")).toBeFalsy()
  })
})
