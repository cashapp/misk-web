import reduce from "lodash/reduce"
import { IMiskTabJSON, logFormatter } from "../../utils"
import { generatedByCLI, prettier } from "../templates"
import { getPackageVersion, MiskPkg, MiskVersion } from "../changelog"

const header = {
  license: "SEE LICENSE IN https://github.com/square/misk-web",
  main: "src/index.tsx"
}

const scripts = (miskTab: IMiskTabJSON) => ({
  engines: {
    yarn: "YARN NO LONGER USED - use npm instead."
  },
  scripts: {
    build: `npm run-script lib ${
      miskTab.zipOnBuild ? "&& npm run-script zip" : ""
    }`,
    "ci-build": `npm install && npm run-script clean && npm run-script prebuild && cross-env NODE_ENV=production npm run-script lib ${
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
      'prettier --write --config package.json ".{/src/**/,/}*.{md,css,sass,less,json,js,jsx,ts,tsx}"',
    prebuild: "npm run-script lint",
    reinstall: "rm -rf node_modules && npm run-script install",
    start:
      "npm run-script prebuild && cross-env NODE_ENV=development webpack-dev-server",
    test: "echo no test",
    zip: `tar --exclude='.DS_Store' --exclude='.old_build_files' --exclude='demo' --exclude='lib' --exclude='node_modules' --exclude='package-lock.json' --exclude='${
      miskTab.slug
    }.tgz' -czvf ${miskTab.slug}.tgz ./`
  }
})

const createMiskPackageJson = (
  packages: MiskPkg[],
  miskTab: IMiskTabJSON
): { [pkg in MiskPkg]?: string } =>
  reduce(
    packages,
    (packageJson: { [pkg in MiskPkg]?: string }, pkg: MiskPkg) => {
      const pkgVersion = getPackageVersion(pkg, miskTab.version)
      if (pkgVersion) {
        return { ...packageJson, [pkg]: pkgVersion }
      } else {
        console.error(
          logFormatter(
            "prebuild][error",
            `Failed to find package ${pkg}@${
              miskTab.version
            }.\n\tTry updating your version in miskTab.json to latest: ${
              MiskVersion.latest
            }.`
          )
        )
        return packageJson
      }
    },
    {}
  )

const dependencies = (miskTab: IMiskTabJSON, pkg: any) => ({
  dependencies: {
    ...pkg.dependencies,
    ...createMiskPackageJson(
      [MiskPkg.common, MiskPkg.core, MiskPkg.simpleredux],
      miskTab
    )
  }
})

const devDependencies = (miskTab: IMiskTabJSON, pkg: any) => ({
  devDependencies: {
    ...pkg.devDependencies,
    ...createMiskPackageJson([MiskPkg.dev, MiskPkg.tslint], miskTab)
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
