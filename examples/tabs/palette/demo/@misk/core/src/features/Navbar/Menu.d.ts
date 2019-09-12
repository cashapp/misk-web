import * as React from "react";
import { IDashboardTab } from "../../utilities";
import { IMenuButtonExternalProps } from "./MenuButton";
import { IThemeProps } from "./DimensionAwareNavbar";
export interface IMenuExternalProps extends IMenuButtonExternalProps, IThemeProps {
    error?: any;
    links?: IDashboardTab[];
    linkComponent?: any;
}
export interface IMenuProps extends IMenuExternalProps {
    processedNavbarItems?: JSX.Element[];
}
export declare class Menu extends React.Component<IMenuProps, {}> {
    state: {
        isOpen: boolean;
    };
    render(): JSX.Element;
    private renderMenuCategories;
    private handleClick;
}
