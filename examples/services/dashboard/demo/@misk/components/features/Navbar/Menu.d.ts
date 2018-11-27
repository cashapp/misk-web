import { IDashboardTab } from "@misk/common";
import * as React from "react";
/**
 * <Menu
 *    error={this.props.error}
 *    links={this.props.links}
 *    processedNavbarItems={this.props.processedNavbarItems}
 *  />
 */
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
