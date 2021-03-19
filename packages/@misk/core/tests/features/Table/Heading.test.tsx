import React from "react"
import { cleanup, render } from "@testing-library/react"
import { Heading } from "src/features/Table"
import { cars } from "./testFixtures"

describe("Table Heading", () => {
  afterEach(cleanup)
  it("Heading can render", () => {
    const { asFragment } = render(
      <table>
        <Heading data={cars[0]} />
      </table>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
