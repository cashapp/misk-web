export const testPackageScript = {
  test: "jest --passWithNoTests --env=jsdom"
}

export const testPackageJson = {
  jest: {
    testEnvironment: "node",
    snapshotSerializers: ["jest-serializer-html"],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"]
  }
}
