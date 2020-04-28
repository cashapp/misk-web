import { defaultMiskTabJson } from "../../src/utils"
import { createPackage } from "../../src/utils/templates"
import { testPackageJson } from "@misk/test"

describe("createPackage", () => {
  // Set longer timeout since we're actually doing network calls
  jest.setTimeout(15000)

  const pkg = {}

  it("creates the package.json from a template", async () => {
    const miskTab = await defaultMiskTabJson("create-package-test")
    const packageJson = await createPackage(miskTab, pkg)
    expect(packageJson).toHaveProperty("name")
    expect(packageJson).toHaveProperty("version")
    expect(packageJson).toHaveProperty("license")
    expect(packageJson).toHaveProperty("scripts")
    expect(packageJson).toHaveProperty("dependencies")
    expect(packageJson).toHaveProperty("devDependencies")
    expect(packageJson).toHaveProperty("jest")
    expect(packageJson).toHaveProperty("prettier")
  })

  it("uses the templated jest configuration", async () => {
    const miskTab = await defaultMiskTabJson("create-package-test")
    const packageJson = await createPackage(miskTab, pkg)
    expect(packageJson.jest).toEqual(testPackageJson.jest)
  })

  it("merges values from the miskTab.rawPackageJson with the template", async () => {
    const miskTab = await defaultMiskTabJson("create-package-test")
    miskTab.rawPackageJson = {
      name: "I-will-be-overwritten",
      scripts: {
        customScript: "./myCustomScript.sh"
      },
      jest: {
        globalSetup: "<rootDir>/tests/jest.globalSetup.js",
      }
    }
    const packageJson = await createPackage(miskTab, pkg)
    expect(packageJson.jest).toEqual({
      globalSetup: "<rootDir>/tests/jest.globalSetup.js",
      ...testPackageJson.jest
    })
    expect(packageJson.name).toEqual("I-will-be-overwritten")
    expect(packageJson.scripts).toHaveProperty("build")
    expect(packageJson.scripts).toHaveProperty("ci-build")
    expect(packageJson.scripts).toHaveProperty("dev-build")
    expect(packageJson.scripts).toHaveProperty("clean")
    expect(packageJson.scripts).toHaveProperty("lib")
    expect(packageJson.scripts).toHaveProperty("lint")
    expect(packageJson.scripts).toHaveProperty("prebuild")
    expect(packageJson.scripts).toHaveProperty("reinstall")
    expect(packageJson.scripts).toHaveProperty("start")
    expect(packageJson.scripts).toHaveProperty("zip")
    expect(packageJson.scripts).toHaveProperty("customScript")
    expect(packageJson.scripts.customScript).toBe("./myCustomScript.sh")
  })
})
