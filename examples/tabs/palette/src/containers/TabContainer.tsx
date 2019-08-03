import { simpleSelect } from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import {
  HowToComponent,
  SampleTableComponent,
  SampleRouterComponent
} from "../components"
import { SampleFormContainer, SampleNetworkContainer } from "../containers"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "../ducks"

class TabContainer extends React.Component<IState & IDispatchProps, IState> {
  private tableTag = "Cars"
  private tableUrl =
    "https://cashapp.github.io/misk-web/examples/data/demo/cars.json"

  componentDidMount() {
    this.props.simpleNetworkGet(this.tableTag, this.tableUrl)
  }

  render() {
    return (
      <div>
        <SampleTableComponent
          data={simpleSelect(this.props.simpleNetwork, this.tableTag)}
          rows={5}
          url={this.tableUrl}
          tag={this.tableTag}
        />
        <HowToComponent />
        <SampleNetworkContainer />
        <SampleFormContainer />
        <SampleRouterComponent history={this.props.history} location={this.props.location} match={this.props.match} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer)
