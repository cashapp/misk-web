import React from "react"
import { cleanup, render } from "@testing-library/react"
import {
  MiskNavbarContainer,
  testAdminDashboardTabsUrl,
  testServiceMetadataUrl
} from "src/features/Navbar"

describe("Misk Navbar Container", () => {
  afterEach(cleanup)
  it("Container can render", () => {
    const { asFragment } = render(<MiskNavbarContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("Container renders with remote data", () => {
    const { asFragment } = render(
      <MiskNavbarContainer
        adminDashboardTabsUrl={testAdminDashboardTabsUrl}
        serviceMetadataUrl={testServiceMetadataUrl}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
