/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom"
import { cleanup, render } from "react-testing-library"
import {
  cssMiskLink,
  MiskNavbarHeading,
  MiskNavbarHeadingEnvironment
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
  it("Link with cssMiskLink can render", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Link css={css(cssMiskLink)} to={"/link/path/"} />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
