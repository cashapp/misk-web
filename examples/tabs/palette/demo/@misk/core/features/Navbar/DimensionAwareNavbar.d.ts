import * as React from "react";
import { IDimensionAwareProps } from "../Navbar";
import { Environment, IDashboardTab } from "../../utilities";
export interface INavbarProps {
    environment?: Environment;
    environmentBannerVisible?: Environment[];
    environmentNavbarVisible?: Environment[];
    error?: any;
    homeName?: string;
    homeUrl?: string;
    navbar_items?: Array<string | Element | JSX.Element>;
    links?: IDashboardTab[];
    status?: string | Element | JSX.Element;
}
export declare class DimensionAwareNavbar extends React.Component<IDimensionAwareProps & INavbarProps, {}> {
    state: {
        isOpen: boolean;
    };
    render(): JSX.Element;
}
