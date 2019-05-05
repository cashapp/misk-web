export const testPackageScript = {
  test: "jest --passWithNoTests"
}

export const testPackageJson = {
  jest: {
    testEnvironment: "jsdom",
    snapshotSerializers: ["jest-serializer-html", "jest-emotion"],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"]
  }
}
