import {
  MiskNavbarContainer,
  testAdminDashboardTabsUrl,
  testServiceMetadataUrl,
} from "@misk/core"
import * as React from "react"
import { TestComponent } from "src/components"

export const DashboardContainer = () => (
  <MiskNavbarContainer
    adminDashboardTabsUrl={testAdminDashboardTabsUrl}
    serviceMetadataUrl={testServiceMetadataUrl}
  >
    <TestComponent />
  </MiskNavbarContainer>
)
