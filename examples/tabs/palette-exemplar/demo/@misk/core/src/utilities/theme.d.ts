import { color } from "./css";
import { Environment } from "./interfaces";
export interface ITheme {
    bannerLinkHover: color | string;
    bannerText: color | string;
    button: color | string;
    buttonHover: color | string;
    categoryText: color | string;
    environmentToColor: (environment: Environment) => color | string;
    navbarBackground: color | string;
    navbarLinkHover: color | string;
    navbarText: color | string;
}
export declare const defaultTheme: ITheme;
