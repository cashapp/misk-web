import React from "react"
import { cleanup } from "@testing-library/react"
import { LoadDataForm } from "src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"
import { stateWithData } from "./testFixtures"

describe("LoadDataForm", () => {
  afterEach(cleanup)
  it("LoadDataForm can render with redux", () => {
    const { asFragment } = renderWithRedux(<LoadDataForm tag={"LoadData"} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("LoadDataForm can render with data", () => {
    const { asFragment } = renderWithRedux(
      <LoadDataForm tag={"LoadData"} />,
      stateWithData
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
