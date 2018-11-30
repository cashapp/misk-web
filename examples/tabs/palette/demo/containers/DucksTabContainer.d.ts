import * as React from "react";
import { IPaletteDispatchProps, IState } from "../ducks";
interface IContainerProps extends IPaletteDispatchProps, IState {
}
declare class DucksTabContainer extends React.Component<IContainerProps> {
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof DucksTabContainer, Pick<IContainerProps, "router">>;
export default _default;
