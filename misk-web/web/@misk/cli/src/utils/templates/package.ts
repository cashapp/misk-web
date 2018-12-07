import { MiskTabVersions } from "../../utils"
import { prettier } from "../templates"

const header = {
  license: "SEE LICENSE IN https://github.com/square/misk-web",
  main: "src/index.ts"
}

const scripts = {
  engines: {
    yarn: "YARN NO LONGER USED - use npm instead."
  },
  scripts: {
    build:
      "npm run-script lint && npm run-script ci-build && npm run-script zip",
    "ci-build": "npm run-script clean && npm run-script lib",
    clean: "rm -rf demo lib",
    lib: "cross-env NODE_ENV=production webpack",
    lint:
      'prettier --write --config package.json ".{/src/**/,/}*.{md,css,sass,less,json,js,jsx,ts,tsx}"',
    reinstall: "rm -rf node_modules && npm run-script install",
    start:
      "npm run-script lint && cross-env NODE_ENV=development webpack-dev-server",
    test: "echo no test",
    zip:
      "tar --exclude='.DS_Store' --exclude='demo' --exclude='lib' --exclude='node_modules' --exclude='package-lock.json' --exclude='palette.tgz' -czvf palette.tgz ./"
  }
}

const dependencies = (pkg: any) => ({
  dependencies: {
    ...pkg.dependencies,
    "@misk/common": `^${MiskTabVersions.latest["@misk/common"]}`,
    "@misk/core": `^${MiskTabVersions.latest["@misk/core"]}`
  }
})

const devDependencies = (pkg: any) => ({
  devDependencies: {
    ...pkg.devDependencies,
    "@misk/dev": `^${MiskTabVersions.latest["@misk/dev"]}`,
    "@misk/tslint": `^${MiskTabVersions.latest["@misk/tslint"]}`
  }
})

export const createPackage = (slug: string, pkg: any) => ({
  name: `misk-web-tab-${slug}`,
  version: pkg.version,
  ...header,
  ...scripts,
  ...dependencies(pkg),
  ...devDependencies(pkg),
  ...prettier
})
