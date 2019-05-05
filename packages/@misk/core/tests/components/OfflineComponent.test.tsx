import React from "react"
import { cleanup, render } from "react-testing-library"
import { OfflineComponent } from "../../src/components"

describe("components", () => {
  afterEach(cleanup)
  it("OfflineComponent can render", () => {
    const { asFragment } = render(<OfflineComponent />)
    expect(asFragment()).toMatchSnapshot()
  })
})
