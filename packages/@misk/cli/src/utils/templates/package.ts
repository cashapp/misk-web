import { IMiskTabJSON } from "../../utils"
import { generatedByCLI, prettier } from "../templates"
import { getPackageVersion, MiskPkg } from "../changelog"

const header = {
  license: "SEE LICENSE IN https://github.com/square/misk-web",
  main: "src/index.tsx"
}

const scripts = (miskTab: IMiskTabJSON) => ({
  engines: {
    yarn: "YARN NO LONGER USED - use npm instead."
  },
  scripts: {
    build: miskTab.zipOnBuild
      ? `cross-env NODE_ENV=production npm run-script lib && npm run-script zip`
      : "cross-env NODE_ENV=production npm run-script lib",
    "ci-build":
      "npm install && npm run-script clean && npm run-script prebuild && cross-env NODE_ENV=production npm run-script lib",
    "dev-build": miskTab.zipOnBuild
      ? `npm run-script prebuild && cross-env NODE_ENV=development npm run-script lib && npm run-script zip`
      : "npm run-script prebuild && cross-env NODE_ENV=development npm run-script lib",
    clean: "rm -rf demo lib",
    lib: "webpack",
    lint:
      'prettier --write --config package.json ".{/src/**/,/}*.{md,css,sass,less,json,js,jsx,ts,tsx}"',
    prebuild: "miskweb prebuild && npm run-script lint",
    reinstall: "rm -rf node_modules && npm run-script install",
    start:
      "npm run-script prebuild && cross-env NODE_ENV=development webpack-dev-server",
    test: "echo no test",
    zip: `tar --exclude='.DS_Store' --exclude='.old_build_files' --exclude='demo' --exclude='lib' --exclude='node_modules' --exclude='package-lock.json' --exclude='${
      miskTab.slug
    }.tgz' -czvf ${miskTab.slug}.tgz ./`
  }
})

const dependencies = (miskTab: IMiskTabJSON, pkg: any) => ({
  dependencies: {
    ...pkg.dependencies,
    [MiskPkg.common]: `^${getPackageVersion(MiskPkg.common, miskTab.version)}`,
    [MiskPkg.core]: `^${getPackageVersion(MiskPkg.core, miskTab.version)}`,
    [MiskPkg.simpleredux]: `^${getPackageVersion(
      MiskPkg.simpleredux,
      miskTab.version
    )}`
  }
})

const devDependencies = (miskTab: IMiskTabJSON, pkg: any) => ({
  devDependencies: {
    ...pkg.devDependencies,
    [MiskPkg.dev]: `^${getPackageVersion(MiskPkg.dev, miskTab.version)}`,
    [MiskPkg.tslint]: `^${getPackageVersion(MiskPkg.tslint, miskTab.version)}`
  }
})

export const createPackage = (miskTab: IMiskTabJSON, pkg: any) => ({
  name: `misk-web-tab-${miskTab.slug}`,
  version: pkg.version,
  ...header,
  ...scripts(miskTab),
  ...dependencies(miskTab, pkg),
  ...devDependencies(miskTab, pkg),
  ...prettier,
  generated: generatedByCLI
})
