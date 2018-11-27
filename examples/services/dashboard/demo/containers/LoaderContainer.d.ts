import { AxiosRequestConfig } from "axios";
import * as React from "react";
import { IState } from "../ducks";
export interface ILoaderProps extends IState {
}
export declare const get: (url: string, config?: AxiosRequestConfig) => Promise<{
    data: any;
    error: any;
}>;
export declare const initialRequestState: () => {
    data: any;
    error: any;
};
declare class LoaderContainer extends React.Component<ILoaderProps> {
    state: {
        adminDashboardTabs: {
            data: any;
            error: any;
        };
        error: any;
        serviceMetadata: {
            data: any;
            error: any;
        };
    };
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof LoaderContainer, Pick<ILoaderProps, never>>;
export default _default;
