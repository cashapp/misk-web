import { IResizeEntry } from "@blueprintjs/core";
import * as React from "react";
import { INavbarProps } from "../Navbar";
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
