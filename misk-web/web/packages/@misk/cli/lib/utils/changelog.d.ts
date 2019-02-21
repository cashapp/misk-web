export declare enum MiskVersion {
    "latest" = "0.1.4",
    "alpha" = "0.1.4-14",
    "v014" = "0.1.4",
    "v014_14" = "0.1.4-14",
    "v014_13" = "0.1.4-13",
    "v014_12" = "0.1.4-12",
    "v014_11" = "0.1.4-11",
    "v014_10" = "0.1.4-10",
    "v014_9" = "0.1.4-9",
    "v014_6" = "0.1.4-6",
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
export declare enum MiskPkg {
    "cli" = "@misk/cli",
    "common" = "@misk/common",
    "core" = "@misk/core",
    "dev" = "@misk/dev",
    "simpleredux" = "@misk/simpleredux",
    "tslint" = "@misk/tslint"
}
export interface IMiskTabVersion {
    date: string;
    [MiskPkg.cli]: string;
    [MiskPkg.common]: string;
    [MiskPkg.core]: string;
    [MiskPkg.dev]: string;
    [MiskPkg.simpleredux]?: string;
    [MiskPkg.tslint]: string;
    notes?: string;
}
export interface IMiskTabVersions {
    [key: string]: IMiskTabVersion;
}
export declare const getVersion: (version: string) => string;
export declare const getPackageVersion: (miskWebPackage: MiskPkg, miskWebVersion: string) => string;
export declare const MiskTabVersions: IMiskTabVersions;
