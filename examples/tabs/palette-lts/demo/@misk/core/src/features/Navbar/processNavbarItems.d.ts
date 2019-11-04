import { Environment, ITheme } from "src/utilities";
export declare const processNavbarItems: (theme: ITheme, environment?: Environment, environmentNavbarVisible?: Environment[], navbar_items?: (string | Element | JSX.Element)[]) => JSX.Element[];
export declare const truncateNavbarItemsByScreenWidth: (width: number, navbar_items?: (string | Element | JSX.Element)[]) => (string | Element | JSX.Element)[];
