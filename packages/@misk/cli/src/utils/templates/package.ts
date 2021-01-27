import {
  testPackageJson,
  testPackageJson_0_1_x,
  testPackageScript,
} from "@misk/test"
import { merge, reduce, unset } from "lodash"
import semver from "semver"
import { IMiskTabJSON, Files, getSemVarPackageVersionOnNPM } from "../../utils"
import { generatedByCLI, prettier } from "../templates"
import { MiskPkg } from "../../utils"

const header = {
  license: "SEE LICENSE IN https://github.com/cashapp/misk-web",
  main: "src/index.tsx",
}

const scripts = (miskTab: IMiskTabJSON) => ({
  scripts: {
    build: `npm run-script lib && npm run-script test ${
      miskTab.zipOnBuild ? "&& npm run-script zip" : ""
    }`,
    "ci-build": `npm install && npm run-script clean && npm run-script prebuild && cross-env NODE_ENV=production npm run-script lib && npm run-script test ${
      miskTab.zipOnBuild ? "&& npm run-script zip" : ""
    }`,
    "dev-build": `npm run-script dev-lib ${
      miskTab.zipOnBuild ? "&& npm run-script zip" : ""
    }`,
    clean: "rm -rf demo lib",
    "clean-build-files":
      "rm .hash package-lock.json package.json tsconfig.json webpack.config.js",
    lib: "cross-env NODE_ENV=production webpack",
    "dev-lib": "cross-env NODE_ENV=development webpack",
    lint:
      'mkdir -p src tests && prettier --write --config package.json "{src/**/,tests/**/,.}*.{md,css,sass,less,json,js,jsx,ts,tsx}"',
    prebuild: "npm run-script lint",
    reinstall: "rm -rf node_modules && npm run-script install",
    start:
      "npm run-script prebuild && cross-env NODE_ENV=development webpack-dev-server",
    ...testPackageScript,
    zip: `tar ${[
      Files.gitignore,
      Files.old,
      Files.package,
      Files.packageLock,
      Files.prettier,
      Files.tsconfig,
      Files.webpack,
      Files.yarnLock,
      "demo",
      "lib",
      ".DS_Store",
      "*.log",
      "node_modules",
      `${miskTab.slug}.tgz`,
    ]
      .map(file => `--exclude='${file}'`)
      .join(" ")} -czvf ${miskTab.slug}.tgz ./`,
  },
})

const createMiskPackageJson = async (
  packages: MiskPkg[],
  miskTab: IMiskTabJSON
): Promise<{ [pkg in MiskPkg]?: string }> => {
  const pkgVersions = await Promise.all(
    packages.map(pkg => getSemVarPackageVersionOnNPM(miskTab.version, pkg))
  )
  const pkgVersionMap = packages.map((pkg: string, index: number) => ({
    [pkg]: pkgVersions[index],
  }))
  return reduce(
    pkgVersionMap,
    (pj: { [pkg in MiskPkg]?: string }, pkg: { [key: string]: string }) => ({
      ...pj,
      ...pkg,
    }),
    {}
  )
}

const dependencies = async (miskTab: IMiskTabJSON, pkg: any) => ({
  dependencies: {
    ...pkg.dependencies,
    ...(await createMiskPackageJson(
      [MiskPkg.common, MiskPkg.core, MiskPkg.simpleredux],
      miskTab
    )),
  },
})

const devDependencies = async (miskTab: IMiskTabJSON, pkg: any) => {
  let existingDevDeps = pkg.devDependencies
  unset(existingDevDeps, "@misk/tslint")
  return {
    devDependencies: {
      ...existingDevDeps,
      ...(await createMiskPackageJson(
        [MiskPkg.dev, MiskPkg.prettier, MiskPkg.test],
        miskTab
      )),
    },
  }
}

const jestConfiguration = (miskTab: IMiskTabJSON) =>
  // Use old jest-emotion jest package.json stanza for <0.2.0 Misk Tab versions
  semver.satisfies(semver.coerce(miskTab.version), "<0.2.0")
    ? {
        // Values from testPackageJson will be used if no jest stanza is present
        // in the miskTab.rawPackageJson
        jest: merge(miskTab.rawPackageJson.jest, testPackageJson_0_1_x.jest),
      }
    : {
        // Values from testPackageJson will be used if no jest stanza is present
        // in the miskTab.rawPackageJson
        jest: merge(miskTab.rawPackageJson.jest, testPackageJson.jest),
      }

/**
 * Creates a package.json object with a default configuration.
 * Modifications to the user's miskTab will be merged with the defaults.
 */
export const createPackage = async (miskTab: IMiskTabJSON, pkg: any) =>
  merge(pkg, {
    name: `misk-web-tab-${miskTab.slug}`,
    version:
      pkg.version && pkg.version.length > 0
        ? pkg.version
        : await getSemVarPackageVersionOnNPM(miskTab.version),
    ...header,
    ...scripts(miskTab),
    ...(await dependencies(miskTab, pkg)),
    ...(await devDependencies(miskTab, pkg)),
    ...jestConfiguration(miskTab),
    ...prettier,
    ...miskTab.rawPackageJson,
    generated: generatedByCLI,
  })
