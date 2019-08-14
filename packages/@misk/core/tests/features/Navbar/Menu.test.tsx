import React from "react"
import { BrowserRouter } from "react-router-dom"
import { cleanup, render } from "@testing-library/react"
import { Menu } from "../../../src/features/Navbar"
import { adminDashboardTabs, axiosError } from "../../testUtilities"

describe("Navbar Menu", () => {
  afterEach(cleanup)
  it("Menu can render", () => {
    const { asFragment } = render(<Menu />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("Menu can render with error", () => {
    const { asFragment } = render(<Menu error={axiosError} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("Menu can render with links", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Menu links={adminDashboardTabs} />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("Menu can render with rendered navbar items", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Menu
          processedNavbarItems={[
            <span>{"Navbar Item Alpha"}</span>,
            <span>{"Navbar Item Bravo"}</span>
          ]}
        />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("Menu can render with links and rendered navbar items", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Menu
          links={adminDashboardTabs}
          processedNavbarItems={[
            <span>{"Navbar Item Alpha"}</span>,
            <span>{"Navbar Item Bravo"}</span>
          ]}
        />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
