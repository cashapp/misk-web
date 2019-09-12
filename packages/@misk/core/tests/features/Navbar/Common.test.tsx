/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import { cleanup, render } from "@testing-library/react"
import {
  cssMiskLink,
  cssNavbarHeadingEnvironment,
  cssNavbarHeading
} from "../../../src/features/Navbar"
import { defaultTheme, Environment } from "src"

describe("Navbar Common", () => {
  afterEach(cleanup)
  it("MiskNavbarHeading can render", () => {
    const { asFragment } = render(<span css={cssNavbarHeading(defaultTheme)} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("MiskNavbarHeadingEnvironment can render", () => {
    const { asFragment } = render(
      <span
        css={cssNavbarHeadingEnvironment(Environment.DEVELOPMENT, defaultTheme)}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("Link with cssMiskLink can render", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Link css={css(cssMiskLink(defaultTheme))} to={"/link/path/"} />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
