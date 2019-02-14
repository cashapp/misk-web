import * as React from "react";
import { IDimensionAwareProps } from "../Navbar";
/**
 * <NavItems
 *    height={this.state.height}
 *    width={this.state.width}
 *    processedNavbarItems={this.props.processedNavbarItems}
 *  />
 */
export interface INavItemsProps {
    processedNavbarItems?: JSX.Element[];
}
export declare class NavItems extends React.Component<IDimensionAwareProps & INavItemsProps, {}> {
    render(): JSX.Element[];
}
