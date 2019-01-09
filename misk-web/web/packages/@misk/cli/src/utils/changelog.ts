export enum MiskVersion {
  "latest" = "0.1.3-1",
  "alpha" = "0.1.3-2",
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

export const MiskTabVersions: IMiskTabVersions = {
  [MiskVersion.v013_2]: {
    [MiskPkg.cli]: "0.1.3-2",
    [MiskPkg.common]: "0.1.3-2",
    [MiskPkg.core]: "0.1.3-2",
    [MiskPkg.dev]: "0.1.3-2",
    [MiskPkg.tslint]: "0.1.3-2",
    date: "2019-01-08",
    notes: "Fresh release of all using Rush"
  },
  [MiskVersion.v013_1]: {
    [MiskPkg.cli]: "0.1.3-1",
    [MiskPkg.common]: "0.1.3-1",
    [MiskPkg.core]: "0.1.3-1",
    [MiskPkg.dev]: "0.1.3-1",
    [MiskPkg.tslint]: "0.1.3-1",
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
