import { Table } from "@misk/core"
import { simpleSelectorGet } from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import { ExampleFormContainer, ExampleNetworkContainer } from "src/containers"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"
import { HowToComponent, ExampleRouterComponent } from "src/components"

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
        <HowToComponent />
        <Table
          data={simpleSelectorGet(
            this.props.simpleNetwork,
            [this.tableTag, "data", "cars"],
            []
          )}
          range={[0, 5]}
        />
        <ExampleNetworkContainer />
        <ExampleFormContainer />
        <ExampleRouterComponent
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
