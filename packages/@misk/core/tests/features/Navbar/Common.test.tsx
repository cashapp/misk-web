import React from "react"
import { BrowserRouter } from "react-router-dom"
import { cleanup, render } from "react-testing-library"
import {
  MiskNavbarHeading,
  MiskNavbarHeadingEnvironment,
  MiskLink
} from "../../../src/features/Navbar"

describe("Navbar Common", () => {
  afterEach(cleanup)
  it("MiskNavbarHeading can render", () => {
    const { asFragment } = render(<MiskNavbarHeading />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("MiskNavbarHeadingEnvironment can render", () => {
    const { asFragment } = render(<MiskNavbarHeadingEnvironment />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("MiskLink can render", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <MiskLink to={"/link/path/"} />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
