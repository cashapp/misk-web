import React from "react"
import { cleanup } from "@testing-library/react"
import { LoadDataTableContainer } from "src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"
import { stateWithData } from "./testFixtures"

describe("LoadDataTableContainer", () => {
  afterEach(cleanup)
  it("LoadDataTableContainer can render with redux", () => {
    const { asFragment } = renderWithRedux(
      <LoadDataTableContainer tag={"LoadData"} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("LoadDataTableContainer can render with data", () => {
    const { asFragment } = renderWithRedux(
      <LoadDataTableContainer tag={"LoadData"} />,
      stateWithData
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
