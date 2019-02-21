import * as React from "react";
import { IDimensionAwareProps } from "../Navbar";
export interface INavItemsProps {
    processedNavbarItems?: JSX.Element[];
}
export declare class NavItems extends React.Component<IDimensionAwareProps & INavItemsProps, {}> {
    render(): JSX.Element[];
}
