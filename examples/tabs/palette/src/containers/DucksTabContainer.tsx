import { get, initialResponseState, OfflineComponent } from "@misk/components"
import * as React from "react"
import { connect } from "react-redux"
import { Table } from "../components"
import { dispatchPalette, IPalleteState, IState } from "../ducks"

interface IContainerProps {
  palette: IPalleteState
  request: () => void
}

const shortUrlsUrl =
  "https://square.github.io/misk-web/examples/data/demo/shortUrls.json"

class DucksTabContainer extends React.Component<IContainerProps> {
  state = {
    shortUrls: initialResponseState()
  }

  async componentDidMount() {
    this.setState({
      ...this.state,
      shortUrls: await get(shortUrlsUrl)
    })
  }

  render() {
    if (this.state.shortUrls.data) {
      return <Table data={this.state.shortUrls.data.urlTokenMetadata} />
    } else {
      return (
        <OfflineComponent
          title={"Error Loading Palette Short Urls"}
          error={this.state.shortUrls.error}
          endpoint={shortUrlsUrl}
        />
      )
    }
  }
}

const mapStateToProps = (state: IState) => ({
  palette: state.palette.toJS()
})

const mapDispatchToProps = {
  request: dispatchPalette.request
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DucksTabContainer)
