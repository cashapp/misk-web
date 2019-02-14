export enum MiskVersion {
  "latest" = "0.1.3",
  "alpha" = "0.1.4-2",
  "v014_3" = "0.1.4-3",
  "v014_2" = "0.1.4-2",
  "v014_1" = "0.1.4-1",
  "v013" = "0.1.3",
  "v013_19" = "0.1.3-19",
  "v013_18" = "0.1.3-18",
  "v013_16" = "0.1.3-16",
  "v013_15" = "0.1.3-15",
  "v013_14" = "0.1.3-14",
  "v013_13" = "0.1.3-13",
  "v013_12" = "0.1.3-12",
  "v013_11" = "0.1.3-11",
  "v013_10" = "0.1.3-10",
  "v013_9" = "0.1.3-9",
  "v013_8" = "0.1.3-8",
  "v013_7" = "0.1.3-7",
  "v013_6" = "0.1.3-6",
  "v013_5" = "0.1.3-5",
  "v013_4" = "0.1.3-4",
  "v013_3" = "0.1.3-3",
  "v013_2" = "0.1.3-2",
  "v013_1" = "0.1.3-1",
  "v012alpha02" = "0.1.2-alpha-0.2",
  "v012alpha01" = "0.1.2-alpha-0.1",
  "v011" = "0.1.1",
  "v011alpha06" = "0.1.1-alpha-0.6",
  "v011alpha05" = "0.1.1-alpha-0.5",
  "v011alpha04" = "0.1.1-alpha-0.4",
  "v011alpha03" = "0.1.1-alpha-0.3",
  "v011alpha01" = "0.1.1-alpha-0.1",
  "v010" = "0.1.0",
  "v0012" = "0.0.12",
  "v0011" = "0.0.11",
  "v0010" = "0.0.10",
  "v0009" = "0.0.09",
  "v0008" = "0.0.08",
  "v0007" = "0.0.07",
  "v0006" = "0.0.06",
  "v0005" = "0.0.05",
  "v0004" = "0.0.04",
  "v0003" = "0.0.03",
  "v0002" = "0.0.02",
  "v0001" = "0.0.01"
}

export enum MiskPkg {
  "cli" = "@misk/cli",
  "common" = "@misk/common",
  "core" = "@misk/core",
  "dev" = "@misk/dev",
  "tslint" = "@misk/tslint"
}

export interface IMiskTabVersion {
  date: string
  [MiskPkg.cli]: string
  [MiskPkg.common]: string
  [MiskPkg.core]: string
  [MiskPkg.dev]: string
  [MiskPkg.tslint]: string
  notes?: string
}

export interface IMiskTabVersions {
  [key: string]: IMiskTabVersion
}

export const getVersion = (version: string) => {
  if (version == "latest") {
    return MiskVersion.latest
  } else if (version == "alpha") {
    return MiskVersion.alpha
  } else {
    return version
  }
}

export const getPackageVersion = (
  miskWebPackage: MiskPkg,
  miskWebVersion: string
) => {
  let version = getVersion(miskWebVersion)
  if (version in MiskTabVersions) {
    if (miskWebPackage in MiskTabVersions[version]) {
      return MiskTabVersions[version][miskWebPackage]
    } else {
      throw new Error(
        `No ${miskWebPackage} version found in Misk-Web@${version}, ${Object.values(
          MiskPkg
        ).toString()}`
      )
    }
  } else {
    throw new Error(
      `Invalid Misk-Web version in miskTab.json. Recommended version: latest or ${
        MiskVersion.latest
      }. \nChoose a valid version: latest, alpha, ${Object.values(
        MiskVersion
      ).toString()}`
    )
  }
}

export const MiskTabVersions: IMiskTabVersions = {
  [MiskVersion.v014_3]: {
    [MiskPkg.cli]: `${[MiskVersion.v014_3]}`,
    [MiskPkg.common]: `${[MiskVersion.v014_3]}`,
    [MiskPkg.core]: `${[MiskVersion.v014_3]}`,
    [MiskPkg.dev]: `${[MiskVersion.v014_3]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v014_3]}`,
    date: "2019-02-14",
    notes: "Restore removeComments: true to TsConfig in @misk/ packages."
  },
  [MiskVersion.v014_2]: {
    [MiskPkg.cli]: `${[MiskVersion.v014_2]}`,
    [MiskPkg.common]: `${[MiskVersion.v014_2]}`,
    [MiskPkg.core]: `${[MiskVersion.v014_2]}`,
    [MiskPkg.dev]: `${[MiskVersion.v014_2]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v014_2]}`,
    date: "2019-02-14",
    notes:
      "Refactored SimpleNetworkDucks and SimpleFormDucks libraries in @misk/core."
  },
  [MiskVersion.v014_1]: {
    [MiskPkg.cli]: `${[MiskVersion.v014_1]}`,
    [MiskPkg.common]: `${[MiskVersion.v014_1]}`,
    [MiskPkg.core]: `${[MiskVersion.v014_1]}`,
    [MiskPkg.dev]: `${[MiskVersion.v014_1]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v014_1]}`,
    date: "2019-02-07",
    notes: "Release 0.1.3-19 as first 0.1.4 pre-release version."
  },
  [MiskVersion.v013]: {
    [MiskPkg.cli]: `${[MiskVersion.v013]}`,
    [MiskPkg.common]: `${[MiskVersion.v013]}`,
    [MiskPkg.core]: `${[MiskVersion.v013]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013]}`,
    date: "2019-02-07",
    notes: "Release 0.1.3-19 as stable 0.1.3 version."
  },
  [MiskVersion.v013_19]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_19]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_19]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_19]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_19]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_19]}`,
    date: "2019-02-07",
    notes: "Fix broken MiskCollapse builds in @misk/core."
  },
  [MiskVersion.v013_18]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_18]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_18]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_18]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_18]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_18]}`,
    date: "2019-02-07",
    notes: "Change simplnetwork response() to simpleNetworkResponse()."
  },
  [MiskVersion.v013_16]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_16]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_16]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_16]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_16]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_16]}`,
    date: "2019-02-07",
    notes: "Deprecated."
  },
  [MiskVersion.v013_15]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_15]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_15]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_15]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_15]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_15]}`,
    date: "2019-02-07",
    notes:
      "Change SimpleNetwork to new dispatch function name idiom of {state domain}{action name}()."
  },
  [MiskVersion.v013_14]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_14]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_14]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_14]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_14]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_14]}`,
    date: "2019-02-07",
    notes: "Deprecated."
  },
  [MiskVersion.v013_13]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_13]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_13]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_13]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_13]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_13]}`,
    date: "2019-02-06",
    notes: "Deprecated."
  },
  [MiskVersion.v013_12]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_12]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_12]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_12]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_12]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_12]}`,
    date: "2019-02-06",
    notes:
      "Add HEAD method to SimpleNetwork, prepare it for full use in Palette."
  },
  [MiskVersion.v013_11]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_11]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_11]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_11]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_11]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_11]}`,
    date: "2019-01-11",
    notes:
      "Move Prettier to package.json instead of in Prettier.config.js for @misk/ packages."
  },
  [MiskVersion.v013_10]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_10]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_10]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_10]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_10]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_10]}`,
    date: "2019-01-11",
    notes:
      "Move Prettier to package.json instead of in Prettier.config.js for @misk/ packages."
  },
  [MiskVersion.v013_9]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_9]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_9]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_9]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_9]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_9]}`,
    date: "2019-01-11",
    notes:
      "Output to binary executable for all OSs using pkg for Homebrew installation."
  },
  [MiskVersion.v013_8]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_8]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_8]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_8]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_8]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_8]}`,
    date: "2019-01-11",
    notes: "Output to binary executable using pkg for Homebrew installation."
  },
  [MiskVersion.v013_7]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_7]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_7]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_7]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_7]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_7]}`,
    date: "2019-01-11",
    notes:
      "[DEPRECATED] Output to binary executable using nexe for Homebrew installation."
  },
  [MiskVersion.v013_6]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_6]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_6]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_6]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_6]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_6]}`,
    date: "2019-01-10",
    notes:
      "[DEPRECATED] Output to binary executable using nexe for Homebrew installation."
  },
  [MiskVersion.v013_5]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_5]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_5]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_5]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_5]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_5]}`,
    date: "2019-01-09",
    notes:
      "Added prebuild with better error handling back into critical path for all CLI commands."
  },
  [MiskVersion.v013_4]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_4]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_4]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_4]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_4]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_4]}`,
    date: "2019-01-09",
    notes: "Updated releasing documentation and changelog object in CLI."
  },
  [MiskVersion.v013_3]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_3]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_3]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_3]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_3]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_3]}`,
    date: "2019-01-09",
    notes: "Better error handling in CLI for miskTab.json:version"
  },
  [MiskVersion.v013_2]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_2]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_2]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_2]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_2]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_2]}`,
    date: "2019-01-08",
    notes: "Updated CLI"
  },
  [MiskVersion.v013_1]: {
    [MiskPkg.cli]: `${[MiskVersion.v013_1]}`,
    [MiskPkg.common]: `${[MiskVersion.v013_1]}`,
    [MiskPkg.core]: `${[MiskVersion.v013_1]}`,
    [MiskPkg.dev]: `${[MiskVersion.v013_1]}`,
    [MiskPkg.tslint]: `${[MiskVersion.v013_1]}`,
    date: "2019-01-08",
    notes: "Fresh release of all using Rush"
  },
  [MiskVersion.v012alpha01]: {
    [MiskPkg.cli]: "0.0.24",
    [MiskPkg.common]: "0.1.1",
    [MiskPkg.core]: "0.1.1",
    [MiskPkg.dev]: "0.1.1",
    [MiskPkg.tslint]: "0.1.1",
    date: "2019-01-07",
    notes:
      "Change Docker base image to use 10-alpine for Microsoft Rush support"
  },
  [MiskVersion.v012alpha01]: {
    [MiskPkg.cli]: "0.0.24",
    [MiskPkg.common]: "0.1.1",
    [MiskPkg.core]: "0.1.1",
    [MiskPkg.dev]: "0.1.1",
    [MiskPkg.tslint]: "0.1.1",
    date: "2018-12-7  ",
    notes: "Use CLI in Docker misk-web script."
  },
  [MiskVersion.v011]: {
    [MiskPkg.cli]: "0.0.24",
    [MiskPkg.common]: "0.1.1",
    [MiskPkg.core]: "0.1.1",
    [MiskPkg.dev]: "0.1.1",
    [MiskPkg.tslint]: "0.1.1",
    date: "2018-12-7  ",
    notes: "Stable release before CLI adoption."
  },
  [MiskVersion.v011alpha06]: {
    [MiskPkg.cli]: "0.0.3",
    [MiskPkg.common]: "0.1.1-alpha-0.3",
    [MiskPkg.core]: "0.1.1-alpha-0.17",
    [MiskPkg.dev]: "0.1.1-alpha-0.4",
    [MiskPkg.tslint]: "0.1.1-alpha-0.1",
    date: "2018-12-6  ",
    notes: "Initial CLI work."
  },
  [MiskVersion.v011alpha05]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.1-alpha-0.3",
    [MiskPkg.core]: "0.1.1-alpha-0.17",
    [MiskPkg.dev]: "0.1.1-alpha-0.4",
    [MiskPkg.tslint]: "0.1.1-alpha-0.1",
    date: "2018-12-6  ",
    notes:
      "Revert changes in 0.1.1-alpha-0.4. Remove `noUnusedParameters` from tsconfig base in `@misk/dev`"
  },
  [MiskVersion.v011alpha04]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.1-alpha-0.3",
    [MiskPkg.core]: "0.1.1-alpha-0.14",
    [MiskPkg.dev]: "0.1.1-alpha-0.3",
    [MiskPkg.tslint]: "0.1.1-alpha-0.1",
    date: "2018-12-5  ",
    notes: "[DEPRECATED]"
  },
  [MiskVersion.v011alpha03]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.1-alpha-0.3",
    [MiskPkg.core]: "0.1.1-alpha-0.9",
    [MiskPkg.dev]: "0.1.1-alpha-0.3",
    [MiskPkg.tslint]: "0.1.1-alpha-0.1",
    date: "2018-12-4  ",
    notes: "SimpleNetwork Ducks with S"
  },
  [MiskVersion.v011alpha01]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.1-alpha-0.1",
    [MiskPkg.core]: "0.1.1-alpha-0.1",
    [MiskPkg.dev]: "0.1.1-alpha-0.2",
    [MiskPkg.tslint]: "0.1.1-alpha-0.1",
    date: "2018-11-30 ",
    notes: "Rename @misk/core to @misk/core."
  },
  [MiskVersion.v010]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.0",
    [MiskPkg.core]: "0.1.0",
    [MiskPkg.dev]: "0.1.0",
    [MiskPkg.tslint]: "0.1.0",
    date: "2018-11-30 ",
    notes:
      "Stable Release 0.1.0. Migrate from awesome-typescript-loader to ts-loader. Rename @misk/core to @misk/core."
  },
  [MiskVersion.v0012]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.0-alpha-0.6",
    [MiskPkg.core]: "0.1.0-alpha-0.16",
    [MiskPkg.dev]: "0.1.0-alpha-0.3",
    [MiskPkg.tslint]: "0.1.0-alpha-0.1",
    date: "2018-11-29 ",
    notes: "Added `reselect` l"
  },
  [MiskVersion.v0011]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.0-alpha-0.5",
    [MiskPkg.core]: "0.1.0-alpha-0.16",
    [MiskPkg.dev]: "0.1.0-alpha-0.2",
    [MiskPkg.tslint]: "0.1.0-alpha-0.1",
    date: "2018-11-28 ",
    notes: "[DEPRECATED] Added `reselect` library."
  },
  [MiskVersion.v0010]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.0-alpha-0.3",
    [MiskPkg.core]: "0.1.0-alpha-0.15",
    [MiskPkg.dev]: "0.1.0-alpha-0.1",
    [MiskPkg.tslint]: "0.1.0-alpha-0.1",
    date: "2018-11-27 ",
    notes: "Robust ErrorCalloutComponent, async network r"
  },
  [MiskVersion.v0009]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.1.0-alpha-0.3",
    [MiskPkg.core]: "0.1.0-alpha-0.7",
    [MiskPkg.dev]: "0.1.0-alpha-0.1",
    [MiskPkg.tslint]: "0.1.0-alpha-0.1",
    date: "2018-11-26 ",
    notes: "Fixed refreshNodeModules command."
  },
  [MiskVersion.v0008]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.0.70",
    [MiskPkg.core]: "0.0.90",
    [MiskPkg.dev]: "0.0.69",
    [MiskPkg.tslint]: "0.0.10",
    date: "2018-11-20 ",
    notes:
      "0.0.5 misk-web runtime. Large changes to Topbar Component, color Enum added with standard colors."
  },
  [MiskVersion.v0007]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.0.70",
    [MiskPkg.core]: "0.0.90",
    [MiskPkg.dev]: "0.0.69",
    [MiskPkg.tslint]: "0.0.10",
    date: "2018-11-19 ",
    notes:
      "[DEPRECATED] Large changes to Topbar Component, color Enum added with standard colors."
  },
  [MiskVersion.v0006]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.0.70",
    [MiskPkg.core]: "0.0.90",
    [MiskPkg.dev]: "0.0.69",
    [MiskPkg.tslint]: "0.0.10",
    date: "2018-11-16 ",
    notes:
      "[DEPRECATED] Large changes to Topbar Component, color Enum added with standard colors."
  },
  [MiskVersion.v0005]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.0.61",
    [MiskPkg.core]: "0.0.79",
    [MiskPkg.dev]: "0.0.64",
    [MiskPkg.tslint]: "0.0.10",
    date: "2018-11-07 ",
    notes: "Includes CSS to support all `@blueprintjs` packages."
  },
  [MiskVersion.v0004]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.0.60",
    [MiskPkg.core]: "0.0.76",
    [MiskPkg.dev]: "0.0.61",
    [MiskPkg.tslint]: "0.0.10",
    date: "2018-11-06 ",
    notes: "Includes all `@blueprintjs` packages."
  },
  [MiskVersion.v0003]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.0.59",
    [MiskPkg.core]: "0.0.76",
    [MiskPkg.dev]: "0.0.60",
    [MiskPkg.tslint]: "0.0.10",
    date: "2018-11-05 ",
    notes:
      "Assumes `node_modules` installed centrally in `web/node_modules`. This will involve updating `tsconfig.json` in each tab."
  },
  [MiskVersion.v0002]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.0.55",
    [MiskPkg.core]: "0.0.71",
    [MiskPkg.dev]: "0.0.57",
    [MiskPkg.tslint]: "0.0.8",
    date: "2018-11-02 ",
    notes: ""
  },
  [MiskVersion.v0001]: {
    [MiskPkg.cli]: "     ",
    [MiskPkg.common]: "0.0.52",
    [MiskPkg.core]: "0.0.68",
    [MiskPkg.dev]: "0.0.46",
    [MiskPkg.tslint]: "0.0.7",
    date: "2018-10-26 ",
    notes: ""
  }
}
