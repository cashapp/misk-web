import { Table } from "@misk/core"
import { simpleSelectorGet } from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import { HowToComponent } from "src/components"
import { SampleFormContainer, SampleNetworkContainer } from "src/containers"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"

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
        <HowToComponent />
        <Table
          data={simpleSelectorGet(
            this.props.simpleRedux,
            [this.tableTag, "data", "cars"],
            []
          )}
          maxRows={5}
        />
        <SampleNetworkContainer />
        <SampleFormContainer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer)
