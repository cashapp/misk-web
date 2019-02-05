import * as React from "react";
import { IDispatchProps, IState } from "../ducks";
interface IContainerProps extends IState, IDispatchProps {
}
declare class TabContainer extends React.Component<IContainerProps, IState> {
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default;
export default _default;
