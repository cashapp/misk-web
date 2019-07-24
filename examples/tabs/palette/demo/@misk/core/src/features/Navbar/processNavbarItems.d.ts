/// <reference types="react" />
import { Environment } from "../../utilities";
export declare const processNavbarItems: (environment?: Environment, environmentNavbarVisible?: Environment[], navbar_items?: (string | Element | JSX.Element)[]) => JSX.Element[];
export declare const truncateNavbarItemsByScreenWidth: (width: number, navbar_items?: (string | Element | JSX.Element)[]) => (string | Element | JSX.Element)[];
