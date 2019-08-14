import React from "react"
import { cleanup } from "@testing-library/react"
import { SampleFormContainer } from "../../src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"

describe("SampleFormContainer", () => {
  afterEach(cleanup)
  it("SampleFormContainer can render with redux", () => {
    const { asFragment } = renderWithRedux(<SampleFormContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
