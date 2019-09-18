import React from "react"
import { cleanup } from "@testing-library/react"
import { ExampleMergeSagaContainer } from "src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"

describe("ExampleMergeSagaContainer", () => {
  afterEach(cleanup)
  it("ExampleMergeSagaContainer can render with redux", () => {
    const { asFragment } = renderWithRedux(<ExampleMergeSagaContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
