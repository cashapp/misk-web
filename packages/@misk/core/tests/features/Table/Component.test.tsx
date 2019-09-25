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
})
