import React from "react"
import { cleanup, render } from "@testing-library/react"
import { Rows } from "src/features/Table"
import { cars } from "./testFixtures"

describe("Table Rows", () => {
  afterEach(cleanup)
  it("Rows can render", () => {
    const { asFragment } = render(<Rows data={cars} maxRows={cars.length} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("Rows can render with maxRows = 2", () => {
    const { asFragment } = render(<Rows data={cars} maxRows={2} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
