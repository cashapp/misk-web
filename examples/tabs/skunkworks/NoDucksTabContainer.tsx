import { get, initialResponseState, OfflineComponent } from "@misk/core"
import * as React from "react"
import { SampleTableComponent } from "../components"

const shortUrlsUrl =
  "https://cashapp.github.io/misk-web/examples/data/demo/shortUrls.json"

class TabContainer extends React.PureComponent<any> {
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
      return (
        <SampleTableComponent
          data={this.state.shortUrls.data.urlTokenMetadata}
        />
      )
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

export default TabContainer
