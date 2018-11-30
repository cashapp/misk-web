import { OfflineComponent } from "@misk/core"
import * as React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Table } from "../components"
import {
  IPaletteDispatchProps,
  IState,
  paletteSelector,
  rootDispatcher
} from "../ducks"

interface IContainerProps extends IPaletteDispatchProps, IState {}

class DucksTabContainer extends React.Component<IContainerProps> {
  componentDidMount() {
    this.props.get(
      "cars",
      "https://square.github.io/misk-web/examples/data/demo/cars.json"
    )
  }

  render() {
    if (this.props.simpleNetwork) {
      return <Table data={[]} />
    } else {
      return (
        <OfflineComponent
          title={"Error Loading Palette Short Urls"}
          error={this.props.palette.error}
        />
      )
    }
  }
}

const mapStateToProps = (state: IState) =>
  createStructuredSelector({
    palette: paletteSelector(),
    simpleNetwork: () => state.simpleNetwork.toJS()
  })

const mapDispatchToProps = {
  ...rootDispatcher
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DucksTabContainer)
