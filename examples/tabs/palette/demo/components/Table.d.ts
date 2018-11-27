import * as React from "react";
export interface IComponentProps {
    data: IData;
}
interface IData {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export default class TabComponent extends React.PureComponent<IComponentProps> {
    renderExample(data: IData): JSX.Element;
    render(): JSX.Element;
}
export {};
