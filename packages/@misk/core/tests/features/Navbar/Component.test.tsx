import React from "react"
import { cleanup, render } from "react-testing-library"
import { Navbar } from "../../../src/features/Navbar"

describe("Navbar Component", () => {
  afterEach(cleanup)
  it("Navbar can render", () => {
    const { asFragment } = render(<Navbar />)
    expect(asFragment()).toMatchSnapshot()
  })
})
