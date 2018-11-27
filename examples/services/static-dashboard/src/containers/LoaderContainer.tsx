import {
  Navbar,
  OfflineComponent,
  ResponsiveContainer,
  TabLoaderComponent
} from "@misk/components"
import * as React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { IState } from "../ducks"
import { mockAdminDashboardTabs, mockServiceMetadata } from "../utils"

export interface ILoaderProps extends IState {}

const TabContainer = styled(ResponsiveContainer)`
  position: relative;
  top: 110px;
  padding-left: 5px;
`

class LoaderContainer extends React.Component<ILoaderProps> {
  render() {
    const adminDashboardTabs = mockAdminDashboardTabs
    const serviceMetadata = mockServiceMetadata
    const error: any = null
    const unavailableEndpointUrls: string = ""
    if (adminDashboardTabs && serviceMetadata) {
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
          <TabContainer>
            <TabLoaderComponent tabs={adminDashboardTabs} />
          </TabContainer>
        </span>
      )
    } else {
      return (
        <span>
          <Navbar />
          <TabContainer>
            <OfflineComponent
              error={error}
              title={"Error Loading Multibound Admin Tabs"}
              endpoint={unavailableEndpointUrls}
            />
          </TabContainer>
        </span>
      )
    }
  }
}

const mapStateToProps = (state: IState) => ({
  loader: state.loader.toJS(),
  router: state.router
})

export default connect(mapStateToProps)(LoaderContainer)
