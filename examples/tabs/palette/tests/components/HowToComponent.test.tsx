import React from "react"
import { cleanup, render } from "react-testing-library"
import { HowToComponent } from "../../src/components"

describe("HowToComponent", () => {
  afterEach(cleanup)
  it("HowToComponent can render", () => {
    const { asFragment } = render(<HowToComponent />)
    expect(asFragment()).toMatchSnapshot()
  })
})
