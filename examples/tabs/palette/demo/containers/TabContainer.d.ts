import * as React from "react";
import { IDispatchProps, IState } from "../ducks";
declare class TabContainer extends React.Component<IState & IDispatchProps, IState> {
    private tableTag;
    private tableUrl;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default;
export default _default;
