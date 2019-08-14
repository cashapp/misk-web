import React from "react"
import { cleanup, render } from "@testing-library/react"
import { SidebarComponent } from "../../src/components"
import { testTabs } from "../testUtilities"

describe("components", () => {
  afterEach(cleanup)
  it("SidebarComponent can render", () => {
    const { asFragment } = render(<SidebarComponent tabs={testTabs} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
