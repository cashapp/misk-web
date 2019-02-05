import { Environment } from "@misk/common";
import * as React from "react";
export interface IBannerProps {
    environment?: Environment;
    environmentBannerVisible?: Environment[];
    status?: string | Element | JSX.Element;
}
export declare class Banner extends React.Component<IBannerProps, {}> {
    render(): JSX.Element;
}
