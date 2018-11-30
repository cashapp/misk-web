import { Environment } from "@misk/common";
import * as React from "react";
/**
 * <Banner
 *    environment={this.props.environment}
 *    environmentBannerVisible={this.props.environmentBannerVisible}
 *    status={this.props.status}
 *  />
 */
export interface IBannerProps {
    environment?: Environment;
    environmentBannerVisible?: Environment[];
    status?: string | Element | JSX.Element;
}
export declare class Banner extends React.Component<IBannerProps, {}> {
    render(): JSX.Element;
}
