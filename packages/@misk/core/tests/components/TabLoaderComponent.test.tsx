import React from "react"
import { cleanup, render } from "@testing-library/react"
import { TabLoaderComponent } from "../../src/components"
import { testTabs } from "../testUtilities"

describe("components", () => {
  afterEach(cleanup)
  it("TabLoaderComponent can render", () => {
    const { asFragment } = render(<TabLoaderComponent tabs={testTabs} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
