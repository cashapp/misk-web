import { IResizeEntry } from "@blueprintjs/core";
import * as React from "react";
import { INavbarProps } from "../Navbar";
/**
 * <Component
 *    environment={environment}
 *    environmentBannerVisible={[Environment.DEVELOPMENT]}
 *    environmentNavbarVisible={[Environment.DEVELOPMENT]}
 *    error={error}
 *    homeName={"Misk Home"}
 *    homeUrl={"/"}
 *    links={links}
 *    navbarItems={[ "Test1", '<a href="#">Test2</>', <span key={2}>Test3</span> ]}
 *    status={"News Item"}
 *  />
 */
export interface IDimensionAwareProps {
    height: number;
    width: number;
}
export declare class Navbar extends React.Component<INavbarProps, {}> {
    state: {
        height: number;
        width: number;
    };
    handleResize: (entries: IResizeEntry[]) => void;
    render(): JSX.Element;
}
