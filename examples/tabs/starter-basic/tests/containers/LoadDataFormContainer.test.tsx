import React from "react"
import { cleanup } from "@testing-library/react"
import { LoadDataFormContainer } from "src/containers"
import { renderWithRedux } from "../upstreamableTestUtilities"
import { stateWithData } from "./testFixtures"

describe("LoadDataFormContainer", () => {
  afterEach(cleanup)
  it("LoadDataFormContainer can render with redux", () => {
    const { asFragment } = renderWithRedux(
      <LoadDataFormContainer tag={"LoadData"} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("LoadDataFormContainer can render with data", () => {
    const { asFragment } = renderWithRedux(
      <LoadDataFormContainer tag={"LoadData"} />,
      stateWithData
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
