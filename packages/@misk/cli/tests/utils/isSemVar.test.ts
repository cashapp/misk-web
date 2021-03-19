import { isSemVer } from "../../src/utils"

describe("Test parseVersionFromNpmUrl ability to parse out SemVer version from unpkg.com URL", () => {
  it("SemVer checker code confirms valid SemVer", () => {
    expect(isSemVer("0.1.2")).toBeTruthy()
  })
  it("SemVer checker code confirms valid SemVer", () => {
    expect(isSemVer("0.1.2-alpha")).toBeTruthy()
  })
  it("SemVer checker code fails on invalid SemVer", () => {
    expect(isSemVer("latest")).toBeFalsy()
  })
})
