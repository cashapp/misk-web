import { Environment, IDashboardTab } from "@misk/common";
import * as React from "react";
import { IDimensionAwareProps } from "../Navbar";
/**
 * <DimensionAwareComponent
 *    height={this.state.height}
 *    width={this.state.width}
 *    environment={this.props.environment}
 *    environmentBannerVisible={this.props.environmentBannerVisible}
 *    environmentNavbarVisible={this.props.environmentBannerVisible}
 *    error={this.props.error}
 *    homeName={this.props.homeName}
 *    homeUrl={this.props.homeUrl}
 *    links={this.props.links}
 *    navbarItems={this.props.navbarItems}
 *    status={this.props.status}
 *  />
 */
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
