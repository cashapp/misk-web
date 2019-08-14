import React from "react"
import { cleanup, render } from "@testing-library/react"
import { DimensionAwareNavbar } from "../../../src/features/Navbar"
import { Environment } from "src"

describe("Navbar DimensionAwareNavbar", () => {
  afterEach(cleanup)
  it("DimensionAwareNavbar can render", () => {
    const { asFragment } = render(
      <DimensionAwareNavbar height={100} width={100} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("DimensionAwareNavbar renders environment", () => {
    const { asFragment } = render(
      <DimensionAwareNavbar
        height={100}
        environment={Environment.DEVELOPMENT}
        environmentBannerVisible={[Environment.DEVELOPMENT]}
        environmentNavbarVisible={[Environment.DEVELOPMENT]}
        width={100}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("DimensionAwareNavbar renders environment", () => {
    const { asFragment } = render(
      <DimensionAwareNavbar
        height={100}
        environment={Environment.DEVELOPMENT}
        environmentBannerVisible={[Environment.DEVELOPMENT]}
        environmentNavbarVisible={[Environment.DEVELOPMENT]}
        width={100}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
