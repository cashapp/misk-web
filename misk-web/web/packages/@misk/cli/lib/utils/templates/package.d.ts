import { IMiskTabJSON } from "../../utils";
export declare const createPackage: (miskTab: IMiskTabJSON, pkg: any) => {
    generated: string;
    prettier: {
        arrowParens: string;
        bracketSpacing: boolean;
        jsxBracketSameLine: boolean;
        printWidth: number;
        semi: boolean;
        singleQuote: boolean;
        tabWidth: number;
        trailingComma: string;
        useTabs: boolean;
    };
    devDependencies: any;
    dependencies: any;
    engines: {
        yarn: string;
    };
    scripts: {
        build: string;
        "ci-build": string;
        clean: string;
        lib: string;
        lint: string;
        prebuild: string;
        reinstall: string;
        start: string;
        test: string;
        zip: string;
    };
    license: string;
    main: string;
    name: string;
    version: any;
};
