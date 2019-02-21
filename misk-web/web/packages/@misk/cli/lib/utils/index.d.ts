import { MiskVersion } from "./changelog";
export * from "./changelog";
export * from "./generate";
export * from "./migrate";
export interface IMiskTabJSON {
    name: string;
    output_path: string;
    port: number;
    relative_path_prefix: string;
    slug: string;
    tsconfigCompilerOptions: any;
    version: MiskVersion;
    zipOnBuild: boolean;
}
export declare enum Files {
    "gitignore" = ".gitignore",
    "miskTab" = "miskTab.json",
    "old" = ".old_build_files",
    "package" = "package.json",
    "packageLock" = "package-lock.json",
    "prettier" = "prettier.config.js",
    "tsconfig" = "tsconfig.json",
    "tslint" = "tslint.json",
    "webpack" = "webpack.config.js",
    "yarnLock" = "yarn.lock"
}
export declare const JsonOptions: {
    spaces: number;
};
export declare const cmdFromArgs: (exec: string) => string;
export declare const runCmd: (cmd: string) => void;
export declare const handleFail: () => void;
