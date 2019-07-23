import * as React from "react";
import { IDashboardTab } from "../../utilities";
export interface IMenuProps {
    error?: any;
    links?: IDashboardTab[];
    linkComponent?: any;
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
