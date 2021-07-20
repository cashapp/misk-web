import { IconNames } from "@blueprintjs/icons"
import React from "react"
import { BrowserRouter } from "react-router-dom"
const { getByText } = require("@testing-library/dom")
import { cleanup, render } from "@testing-library/react"
import { MenuButton } from 'src/features/Navbar/MenuButton';

describe("Navbar MenuButton", () => {
  afterEach(cleanup)
  it("MenuButton can render closed", () => {
    const { asFragment, container } = render(
      <BrowserRouter>
        <MenuButton handleClick={() => null} isOpen={false} menuShowButton={true} />
      </BrowserRouter>)
    expect(getByText(container, IconNames.MENU)).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
  })
  it("MenuButton can render open", () => {
    const { asFragment, container } = render(
      <BrowserRouter>
        <MenuButton handleClick={() => null} isOpen={true} menuShowButton={true} />
      </BrowserRouter>)
    expect(getByText(container, IconNames.CROSS)).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
  })
  it("MenuButton doesn't render when menuShowButton = false", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <MenuButton handleClick={() => null} isOpen={false} menuShowButton={false} />
      </BrowserRouter>)
    expect(asFragment()).toMatchSnapshot()
  })
  it("MenuButton can render custom Blueprint icons", () => {
    const { asFragment, container } = render(
      <BrowserRouter>
        <MenuButton handleClick={() => null} isOpen={false} menuIcon={IconNames.FOLDER_CLOSE} menuOpenIcon={IconNames.FOLDER_OPEN} menuShowButton={true} />
      </BrowserRouter>)
    expect(getByText(container, IconNames.FOLDER_CLOSE)).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
  })
  it("MenuButton can render as a link", () => {
    const { asFragment, container } = render(
      <BrowserRouter>
        <MenuButton handleClick={() => null} homeUrl={"/test-home-url"} isOpen={false} menuIcon={IconNames.FOLDER_CLOSE} menuButtonAsLink={true} menuShowButton={true} />
      </BrowserRouter>)
    expect(getByText(container, IconNames.FOLDER_CLOSE)).toBeDefined()
    expect(container.querySelector('a[href="/test-home-url"]')).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
  })
})
