import React from "react"
import { cleanup, render } from "@testing-library/react"
import { Table } from "src/features/Table"
import { cars } from "./testFixtures"

describe("Table Component", () => {
  afterEach(cleanup)
  it("Table can render", () => {
    const { asFragment } = render(<Table data={cars} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("Table can render with range", () => {
    const { asFragment } = render(<Table data={cars} range={[2, 4]} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
