import React from "react"
import { cleanup, render } from "react-testing-library"
import {
  CodePreContainer,
  ColumnContainer,
  DesktopWideOnlyContainer,
  FlexContainer,
  MobileNeverContainer,
  MobileOnlyContainer,
  ResponsiveContainer,
  WrapTextContainer
} from "../src/cssContainers"

const TestChildren = () => (
  <div>
    <span>{"Test Child"}</span>
  </div>
)

describe("css containers", () => {
  afterEach(cleanup)
  it("CodePreContainer can render", () => {
    const { asFragment } = render(<CodePreContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("CodePreContainer can render with children", () => {
    const { asFragment } = render(
      <CodePreContainer>
        <TestChildren />
      </CodePreContainer>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("ColumnContainer can render", () => {
    const { asFragment } = render(<ColumnContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("ColumnContainer can render with children", () => {
    const { asFragment } = render(
      <ColumnContainer>
        <TestChildren />
      </ColumnContainer>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("DesktopWideOnlyContainer can render", () => {
    const { asFragment } = render(<DesktopWideOnlyContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("DesktopWideOnlyContainer can render with children", () => {
    const { asFragment } = render(
      <DesktopWideOnlyContainer>
        <TestChildren />
      </DesktopWideOnlyContainer>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("FlexContainer can render", () => {
    const { asFragment } = render(<FlexContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("FlexContainer can render with children", () => {
    const { asFragment } = render(
      <FlexContainer>
        <TestChildren />
      </FlexContainer>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("MobileNeverContainer can render", () => {
    const { asFragment } = render(<MobileNeverContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("MobileNeverContainer can render with children", () => {
    const { asFragment } = render(
      <MobileNeverContainer>
        <TestChildren />
      </MobileNeverContainer>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("MobileOnlyContainer can render", () => {
    const { asFragment } = render(<MobileOnlyContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("MobileOnlyContainer can render with children", () => {
    const { asFragment } = render(
      <MobileOnlyContainer>
        <TestChildren />
      </MobileOnlyContainer>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("ResponsiveContainer can render", () => {
    const { asFragment } = render(<ResponsiveContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("ResponsiveContainer can render with children", () => {
    const { asFragment } = render(
      <ResponsiveContainer>
        <TestChildren />
      </ResponsiveContainer>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("WrapTextContainer can render", () => {
    const { asFragment } = render(<WrapTextContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
  it("WrapTextContainer can render with children", () => {
    const { asFragment } = render(
      <WrapTextContainer>
        <TestChildren />
      </WrapTextContainer>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
