import * as React from "react";
declare class TabContainer extends React.PureComponent<any> {
    state: {
        shortUrls: {
            data: any;
            error: any;
        };
    };
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
}
export default TabContainer;
