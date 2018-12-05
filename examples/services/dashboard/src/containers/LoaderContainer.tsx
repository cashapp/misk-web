import {
  Navbar,
  OfflineComponent,
  response,
  ResponsiveContainer,
  TabLoaderComponent
} from "@misk/core"
import * as React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { IDispatchProps, IState, rootDispatcher, rootSelectors } from "../ducks"

interface IContainerProps extends IState, IDispatchProps {}

const DashboardTabContainer = styled(ResponsiveContainer)`
  position: relative;
  top: 110px;
  padding-left: 5px;
`

class DucksTabContainer extends React.Component<IContainerProps, IState> {
  componentDidMount() {
    this.props.get(
      "adminDashboardTabs",
      "https://square.github.io/misk-web/examples/data/demo/adminDashboardTabs.json"
    )
    this.props.get(
      "serviceMetadata",
      "https://square.github.io/misk-web/examples/data/demo/serviceMetadata.json"
    )
  }

  render() {
    const { simpleNetwork } = this.props
    if (
      response(simpleNetwork, "adminDashboardTabs").data &&
      response(simpleNetwork, "serviceMetadata").data
    ) {
      const { adminDashboardTabs } = response(
        simpleNetwork,
        "adminDashboardTabs"
      ).data
      const { serviceMetadata } = response(
        simpleNetwork,
        "serviceMetadata"
      ).data
      return (
        <span>
          <Navbar
            environment={serviceMetadata.environment}
            links={adminDashboardTabs}
            homeName={serviceMetadata.app_name}
            homeUrl={serviceMetadata.admin_dashboard_url}
            navbar_items={serviceMetadata.navbar_items}
            status={serviceMetadata.navbar_status}
          />
          <DashboardTabContainer>
            <TabLoaderComponent tabs={adminDashboardTabs} />
          </DashboardTabContainer>
        </span>
      )
    } else {
      return (
        <span>
          <Navbar error={response(simpleNetwork, "adminDashboardTabs").error} />
          <DashboardTabContainer>
            <OfflineComponent
              error={response(simpleNetwork, "adminDashboardTabs").error}
              title={"Error Loading Admin Tabs"}
            />
            <OfflineComponent
              error={response(simpleNetwork, "serviceMetadata").error}
              title={"Error Loading Service Metadata"}
            />
          </DashboardTabContainer>
        </span>
      )
    }
  }
}

const mapStateToProps = (state: IState) => rootSelectors(state)

const mapDispatchToProps = {
  ...rootDispatcher
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DucksTabContainer)

// import {
//   DashboardTabContainer,
//   get,
//   initialResponseState,
//   Navbar,
//   OfflineComponent,
//   TabLoaderComponent
// } from "@misk/core"
// import * as React from "react"
// import { connect } from "react-redux"
// import { IState } from "../ducks"

// export interface ILoaderProps extends IState {}

// const adminDashboardTabsUrl =
//   "https://square.github.io/misk-web/examples/data/demo/adminDashboardTabs.json"
// const serviceMetadataUrl =
//   "https://square.github.io/misk-web/examples/data/demo/serviceMetadata.json"

// class LoaderContainer extends React.Component<ILoaderProps> {
//   state = {
//     adminDashboardTabs: initialResponseState(),
//     error: null as any,
//     serviceMetadata: initialResponseState()
//   }

//   async componentDidMount() {
//     this.setState({
//       ...this.state,
//       adminDashboardTabs: await get(adminDashboardTabsUrl),
//       serviceMetadata: await get(serviceMetadataUrl)
//     })
//   }

//   render() {
//     if (this.state.adminDashboardTabs.data && this.state.serviceMetadata.data) {
//       const { adminDashboardTabs } = this.state.adminDashboardTabs.data
//       const { serviceMetadata } = this.state.serviceMetadata.data
//       return (
//         <span>
//           <Navbar
//             environment={serviceMetadata.environment}
//             links={adminDashboardTabs}
//             homeName={serviceMetadata.app_name}
//             homeUrl={serviceMetadata.admin_dashboard_url}
//             navbar_items={serviceMetadata.navbar_items}
//             status={serviceMetadata.navbar_status}
//           />
//           <DashboardTabContainer>
//             <TabLoaderComponent tabs={adminDashboardTabs} />
//           </DashboardTabContainer>
//         </span>
//       )
//     } else {
//       return (
//         <span>
//           <Navbar error={this.state.adminDashboardTabs.error} />
//           <DashboardTabContainer>
//             <OfflineComponent
//               error={this.state.adminDashboardTabs.error}
//               title={"Error Loading Admin Tabs"}
//               endpoint={adminDashboardTabsUrl}
//             />
//             <OfflineComponent
//               error={this.state.serviceMetadata.error}
//               title={"Error Loading Service Metadata"}
//               endpoint={serviceMetadataUrl}
//             />
//           </DashboardTabContainer>
//         </span>
//       )
//     }
//   }
// }

// const mapStateToProps = (state: IState) => ({
//   loader: state.loader.toJS(),
//   router: state.router
// })

// export default connect(mapStateToProps)(LoaderContainer)
