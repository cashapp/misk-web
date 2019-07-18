import { testPackageJson, testPackageScript } from "@misk/test"
import reduce from "lodash/reduce"
import { IMiskTabJSON, Files, getSemVarPackageVersionOnNPM } from "../../utils"
import { generatedByCLI, prettier } from "../templates"
import { MiskPkg } from "../../utils"

const header = {
  license: "SEE LICENSE IN https://github.com/cashapp/misk-web",
  main: "src/index.tsx"
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
      "rm .hash package-lock.json package.json tsconfig.json tslint.json webpack.config.js",
    lib: "cross-env NODE_ENV=production webpack",
    "dev-lib": "cross-env NODE_ENV=development webpack",
    lint:
      'prettier --write --config package.json ".{/src/**/,/}*.{md,css,scss,less,json,js,jsx,ts,tsx}"',
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
      Files.tslint,
      Files.webpack,
      Files.yarnLock,
      "demo",
      "lib",
      ".DS_Store",
      "*.log",
      "node_modules",
      `${miskTab.slug}.tgz`
    ]
      .map(file => `--exclude='${file}'`)
      .join(" ")} -czvf ${miskTab.slug}.tgz ./`
  }
})

const createMiskPackageJson = async (
  packages: MiskPkg[],
  miskTab: IMiskTabJSON
): Promise<{ [pkg in MiskPkg]?: string }> => {
  const pkgVersions = await Promise.all(
    packages.map(pkg => getSemVarPackageVersionOnNPM(miskTab.version, pkg))
  )
  const pkgVersionMap = packages.map((pkg: string, index: number) => ({
    [pkg]: pkgVersions[index]
  }))
  return reduce(
    pkgVersionMap,
    (pj: { [pkg in MiskPkg]?: string }, pkg: { [key: string]: string }) => ({
      ...pj,
      ...pkg
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
    ))
  }
})

const devDependencies = async (miskTab: IMiskTabJSON, pkg: any) => ({
  devDependencies: {
    ...pkg.devDependencies,
    ...(await createMiskPackageJson(
      [MiskPkg.dev, MiskPkg.prettier, MiskPkg.test, MiskPkg.tslint],
      miskTab
    ))
  }
})

export const createPackage = async (miskTab: IMiskTabJSON, pkg: any) => ({
  name: `misk-web-tab-${miskTab.slug}`,
  version:
    pkg.version && pkg.version.length > 0
      ? pkg.version
      : await getSemVarPackageVersionOnNPM(miskTab.version),
  ...header,
  ...scripts(miskTab),
  ...(await dependencies(miskTab, pkg)),
  ...(await devDependencies(miskTab, pkg)),
  ...testPackageJson,
  ...prettier,
  ...miskTab.rawPackageJson,
  generated: generatedByCLI
})
