import { IMiskTabJSON } from "../index";
export declare const createTsconfig: (miskTab: IMiskTabJSON) => {
    compileOnSave: boolean;
    compilerOptions: any;
    include: string[];
};
