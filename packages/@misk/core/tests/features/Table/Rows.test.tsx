import React from "react"
import { cleanup, render } from "@testing-library/react"
import { Rows } from "src/features/Table"
import { cars } from "./testFixtures"

describe("Table Rows", () => {
  afterEach(cleanup)
  it("Rows can render", () => {
    const { asFragment } = render(
      <table>
        <Rows data={cars} range={[0, cars.length]} />
      </table>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("Rows can render with maxRows = 2", () => {
    const { asFragment } = render(
      <table>
        <Rows data={cars} range={[0, 2]} />
      </table>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
