import React from "react"
import { cleanup } from "react-testing-library"
import { SampleNetworkContainer } from "../../src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"

describe("SampleNetworkContainer", () => {
  afterEach(cleanup)
  it("SampleNetworkContainer can render with redux", () => {
    const { asFragment } = renderWithRedux(<SampleNetworkContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
