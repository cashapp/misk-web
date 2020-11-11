/// <reference types="react" />
import { Environment, ITheme } from "src/utilities";
export declare const processNavbarItems: (theme: ITheme, environment?: Environment, environmentNavbarVisible?: Environment[], navbar_items?: (string | Element | JSX.Element)[]) => JSX.Element[];
export declare const calculateNavbarItemsByScreenWidth: (width: number) => number;
