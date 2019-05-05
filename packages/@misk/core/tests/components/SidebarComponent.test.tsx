import React from "react"
import { cleanup, render } from "react-testing-library"
import { SidebarComponent } from "../../src/components"
import { testTabs } from "../testUtilities"

describe("components", () => {
  afterEach(cleanup)
  it("SidebarComponent can render", () => {
    const { asFragment } = render(<SidebarComponent tabs={testTabs} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
