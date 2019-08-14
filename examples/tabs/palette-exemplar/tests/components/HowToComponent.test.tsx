import React from "react"
import { cleanup, render } from "@testing-library/react"
import { HowToComponent } from "../../src/components"

describe("HowToComponent", () => {
  afterEach(cleanup)
  it("HowToComponent can render", () => {
    const { asFragment } = render(<HowToComponent />)
    expect(asFragment()).toMatchSnapshot()
  })
})
