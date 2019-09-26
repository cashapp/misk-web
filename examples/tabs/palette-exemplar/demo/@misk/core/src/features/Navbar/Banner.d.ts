import * as React from "react";
import { Environment } from "../../utilities";
import { IThemeProps } from "./DimensionAwareNavbar";
export interface IBannerExternalProps extends IThemeProps {
    environment?: Environment;
    environmentBannerVisible?: Environment[];
    status?: string | Element | JSX.Element;
}
export declare class Banner extends React.Component<IBannerExternalProps, {}> {
    render(): JSX.Element;
}
