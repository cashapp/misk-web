import { color, Environment } from "../utilities";
export declare const defaultEnvironment = Environment.PRODUCTION;
export declare const defaultEnvironmentIndicatorsVisible: Environment[];
export interface IEnvironmentToColorLookup {
    default: color | string;
    DEVELOPMENT: color | string;
    TESTING: color | string;
    STAGING: color | string;
    PRODUCTION: color | string;
}
export declare const defaultEnvironmentToColorLookup: IEnvironmentToColorLookup;
export declare const environmentToColor: (colorLookup: IEnvironmentToColorLookup) => (environment: Environment) => string;
