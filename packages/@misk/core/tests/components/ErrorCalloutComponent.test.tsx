import React from "react"
import { cleanup, render } from "@testing-library/react"
import { ErrorCalloutComponent } from "../../src/components"
import { axiosError } from "../testUtilities"

describe("components", () => {
  afterEach(cleanup)
  it("ErrorCalloutComponent can render", () => {
    const { asFragment } = render(<ErrorCalloutComponent />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("ErrorCalloutComponent can render", () => {
    const { asFragment } = render(<ErrorCalloutComponent error={axiosError} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
