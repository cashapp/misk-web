import * as React from "react"
import { IDispatchProps, IState } from "../ducks"
interface IContainerProps extends IState, IDispatchProps {}
declare class TabContainer extends React.Component<IContainerProps, IState> {
  componentDidMount(): void
  render(): JSX.Element
}
declare const _default: import("react-redux").ConnectedComponentClass<
  typeof TabContainer,
  Pick<IContainerProps, "router">
>
export default _default
