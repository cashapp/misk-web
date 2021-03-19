import React from "react"
import { cleanup, render } from "@testing-library/react"
import { Row } from "src/features/Table"
import { cars } from "./testFixtures"

describe("Table Row", () => {
  afterEach(cleanup)
  it("Row can render", () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <Row data={cars[0]} />
        </tbody>
      </table>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
