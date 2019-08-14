import React from "react"
import { cleanup, render } from "@testing-library/react"
import { Banner } from "../../../src/features/Navbar"
import { Environment } from "src"

describe("Navbar", () => {
  afterEach(cleanup)
  it("Banner can render empty", () => {
    const { asFragment } = render(<Banner />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("Banner can render with props but banner is not set as visible", () => {
    const { asFragment } = render(
      <Banner
        environment={Environment.DEVELOPMENT}
        environmentBannerVisible={[]}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("Banner can render with props and banner is set to visible", () => {
    const { asFragment } = render(
      <Banner
        environment={Environment.DEVELOPMENT}
        environmentBannerVisible={[Environment.DEVELOPMENT]}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("Banner can render with props, banner is set to visible, and status is displayed", () => {
    const { asFragment } = render(
      <Banner
        environment={Environment.DEVELOPMENT}
        environmentBannerVisible={[Environment.DEVELOPMENT]}
        status={"Alert: Visible Status!"}
      />
    )
    // TODO add test that queries the status code and checks that the exact status text is present in snapshot
    expect(asFragment()).toMatchSnapshot()
  })
})
