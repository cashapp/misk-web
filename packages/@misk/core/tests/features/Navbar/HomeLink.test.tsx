import React from "react"
import { BrowserRouter } from "react-router-dom"
import { cleanup, render } from "react-testing-library"
import { HomeLink } from "../../../src/features/Navbar"

describe("Navbar HomeLink", () => {
  afterEach(cleanup)
  it("HomeLink can render", () => {
    const { asFragment } = render(<HomeLink />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("HomeLink can render with homeName", () => {
    const { asFragment } = render(<HomeLink homeName={"Test Service"} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("HomeLink can render with homeName and homeUrl", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <HomeLink homeName={"Test Service"} homeUrl={"http://home.com/"} />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
