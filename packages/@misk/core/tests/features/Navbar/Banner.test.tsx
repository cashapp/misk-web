const { getByText } = require("@testing-library/dom")
import { cleanup, render } from "@testing-library/react"
import { matchers } from "@emotion/jest"
import React from "react"
import { Banner } from "src/features/Navbar"
import { Environment, defaultTheme, color } from "src"

expect.extend(matchers)

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
    const status = "Alert: Visible Status!"
    const { asFragment, container } = render(
      <Banner
        environment={Environment.DEVELOPMENT}
        environmentBannerVisible={[Environment.DEVELOPMENT]}
        status={status}
      />
    )
    // TODO add test that queries the status code and checks that the exact status text is present in snapshot
    expect(getByText(container, status)).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
  })
  it("Banner renders with theme colors", () => {
    const status = "Alert: Visible Status!"
    const { asFragment } = render(
      <Banner
        environment={Environment.DEVELOPMENT}
        environmentBannerVisible={[Environment.DEVELOPMENT]}
        status={status}
        theme={{ ...defaultTheme, bannerText: color.purple }}
      />
    )
    // TODO add test that queries the status code and checks that the exact status text is present in snapshot
    // TODO add tests that theme values actually propogate
    expect(asFragment()).toMatchSnapshot()
  })
})
