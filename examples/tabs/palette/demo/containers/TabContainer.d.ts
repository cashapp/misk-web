import * as React from "react";
import { IDispatchProps, IState } from "../ducks";
declare class TabContainer extends React.Component<IState & IDispatchProps, IState> {
    private tableTag;
    private tableUrl;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof TabContainer, Pick<IState & IDispatchProps, "router">>;
export default _default;
