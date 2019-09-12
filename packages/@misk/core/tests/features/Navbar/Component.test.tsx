import React from "react"
import { cleanup, render } from "@testing-library/react"
import { Navbar } from "../../../src/features/Navbar"
import { defaultTheme, color } from "src"

describe("Navbar Component", () => {
  afterEach(cleanup)
  it("Navbar can render", () => {
    const { asFragment } = render(<Navbar />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("Navbar can render with theme override using color", () => {
    const { asFragment } = render(
      <Navbar theme={{ ...defaultTheme, navbarBackground: color.purple }} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("Navbar can render with theme override using string", () => {
    const { asFragment } = render(
      <Navbar theme={{ ...defaultTheme, navbarBackground: "purple" }} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
