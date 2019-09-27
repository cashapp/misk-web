import { Table } from "@misk/core"
import { simpleSelectorGet } from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import { HowToComponent, ExampleRouterComponent } from "src/components"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"
import {
  ExampleNetworkContainer,
  ExampleFormContainer,
  ExampleMergeSagaContainer
} from "../containers"

class TabContainer extends React.Component<IState & IDispatchProps, IState> {
  private tableTag = "Cars"
  private tableUrl =
    "https://cashapp.github.io/misk-web/examples/data/demo/cars.json"

  componentDidMount() {
    this.props.simpleHttpGet(this.tableTag, this.tableUrl)
  }

  render() {
    return (
      <div>
        <ExampleMergeSagaContainer />
        <HowToComponent />
        <Table
          data={simpleSelectorGet(
            this.props.simpleRedux,
            [this.tableTag, "data", "cars"],
            []
          )}
          maxRows={5}
        />
        <ExampleNetworkContainer />
        <ExampleFormContainer />
        <ExampleRouterComponent />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer)
