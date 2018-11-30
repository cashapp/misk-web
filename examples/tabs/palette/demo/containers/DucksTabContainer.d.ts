import * as React from "react";
import { IDispatchPaletteDucksProps, IPalleteState, IState } from "../ducks";
interface IContainerProps extends IState, IDispatchPaletteDucksProps {
    palette: IPalleteState;
    request: () => void;
}
declare class DucksTabContainer extends React.Component<IContainerProps> {
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof DucksTabContainer, Pick<IContainerProps, "router" | "request">>;
export default _default;
