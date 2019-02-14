import { getSimpleNetwork } from "@misk/core"
import * as React from "react"
import { connect } from "react-redux"
import { SampleTableComponent } from "../components"
import { SampleNetworkContainer } from "../containers"
import { IDispatchProps, IState, rootDispatcher, rootSelectors } from "../ducks"

class TabContainer extends React.Component<IState & IDispatchProps, IState> {
  private tableTag = "Cars"
  private tableUrl =
    "https://square.github.io/misk-web/examples/data/demo/cars.json"

  componentDidMount() {
    this.props.simpleNetworkGet(this.tableTag, this.tableUrl)
  }

  render() {
    return (
      <div>
        <SampleTableComponent
          data={getSimpleNetwork(this.props.simpleNetwork, this.tableTag)}
          rows={5}
          url={this.tableUrl}
          tag={this.tableTag}
        />
        <SampleNetworkContainer {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => rootSelectors(state)

const mapDispatchToProps = {
  ...rootDispatcher
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer)
