import * as React from "react";
import { IComponentProps } from "../components/Table";
interface IContainerProps {
    example: IComponentProps;
    request: () => void;
}
declare class TabContainer extends React.Component<IContainerProps, {
    children: any;
}> {
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof TabContainer, Pick<IContainerProps, never>>;
export default _default;
