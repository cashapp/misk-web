import { simpleSelectorGet } from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import { SampleFormContainer, SampleNetworkContainer } from "src/containers"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"
import {
  HowToComponent,
  SampleTableComponent,
  SampleRouterComponent
} from "src/components"

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
          data={simpleSelectorGet(
            this.props.simpleNetwork,
            [this.tableTag, "data", "cars"], [])}
          rows={5}
          url={this.tableUrl}
          tag={this.tableTag}
        />
        <HowToComponent />
        <SampleNetworkContainer />
        <SampleFormContainer />
        <SampleRouterComponent
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer)
