import React from "react"
import { cleanup } from "@testing-library/react"
import { ExampleFormContainer } from "src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"

describe("ExampleFormContainer", () => {
  afterEach(cleanup)
  it("ExampleFormContainer can render with redux", () => {
    const { asFragment } = renderWithRedux(<ExampleFormContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
