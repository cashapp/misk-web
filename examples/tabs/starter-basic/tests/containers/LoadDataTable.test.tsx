import React from "react"
import { cleanup } from "@testing-library/react"
import { LoadDataTable } from "src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"
import { stateWithData } from "./testFixtures"

describe("LoadDataTable", () => {
  afterEach(cleanup)
  it("LoadDataTable can render with redux", () => {
    const { asFragment } = renderWithRedux(<LoadDataTable tag={"LoadData"} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("LoadDataTable can render with data", () => {
    const { asFragment } = renderWithRedux(
      <LoadDataTable tag={"LoadData"} />,
      stateWithData
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
