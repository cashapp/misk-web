import * as React from "react";
import { IBannerExternalProps, IDimensionAwareProps, IMenuExternalProps } from "../Navbar";
import { Environment } from "../../utilities";
import { ITheme } from "src/utilities/theme";
export interface INavbarProps extends IBannerExternalProps, IMenuExternalProps, IThemeProps {
    environmentNavbarVisible?: Environment[];
    homeName?: string | Element | JSX.Element;
    homeUrl?: string;
    navbar_items?: Array<string | Element | JSX.Element>;
    navbarItemsToDisplay?: number;
}
export interface IThemeProps {
    theme?: ITheme;
}
export declare class DimensionAwareNavbar extends React.Component<IDimensionAwareProps & INavbarProps, {}> {
    state: {
        isOpen: boolean;
    };
    render(): JSX.Element;
}
