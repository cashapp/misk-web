import React from "react"
import { cleanup } from "@testing-library/react"
import { ExampleNetworkContainer } from "src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"

describe("ExampleNetworkContainer", () => {
  afterEach(cleanup)
  it("ExampleNetworkContainer can render with redux", () => {
    const { asFragment } = renderWithRedux(<ExampleNetworkContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
