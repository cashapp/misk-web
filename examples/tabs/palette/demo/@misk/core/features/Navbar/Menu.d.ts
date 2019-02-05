import { IDashboardTab } from "@misk/common";
import * as React from "react";
export interface IMenuProps {
    error?: any;
    links?: IDashboardTab[];
    processedNavbarItems?: JSX.Element[];
}
export declare class Menu extends React.Component<IMenuProps, {}> {
    state: {
        isOpen: boolean;
    };
    render(): JSX.Element;
    private renderMenuCategories;
    private renderMenuCategory;
    private handleClick;
}
