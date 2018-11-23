import { IDashboardTab } from "@misk/common";
import * as React from "react";
import { IState } from "../ducks";
export interface ILoaderProps extends IState {
    getTabs: (url: string) => any;
    getComponent: (tab: IDashboardTab) => any;
    getServiceMetadata: (url: string) => any;
}
declare class LoaderContainer extends React.Component<ILoaderProps> {
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof LoaderContainer, Pick<ILoaderProps, never>>;
export default _default;
