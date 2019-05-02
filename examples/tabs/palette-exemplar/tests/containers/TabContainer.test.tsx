import React from "react"
import { cleanup } from "react-testing-library"
import { TabContainer } from "../../src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"

describe("TabContainer", () => {
  afterEach(cleanup)
  it("TabContainer can render with redux", () => {
    const { asFragment } = renderWithRedux(<TabContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
})

