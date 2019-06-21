import React from "react"
import { cleanup, render } from "react-testing-library"
import { TextHTMLOrElementComponent } from "../../src/components"

describe("components", () => {
  afterEach(cleanup)
  it("TextHTMLOrElementComponent can render empty children", () => {
    const { asFragment } = render(
      <TextHTMLOrElementComponent>{}</TextHTMLOrElementComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("TextHTMLOrElementComponent can render child div", () => {
    const { asFragment } = render(
      <TextHTMLOrElementComponent>
        {<div>{"Child Div"}</div>}
      </TextHTMLOrElementComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("TextHTMLOrElementComponent can render child string", () => {
    const { asFragment } = render(
      <TextHTMLOrElementComponent>{"Child String"}</TextHTMLOrElementComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("TextHTMLOrElementComponent can render string HTML", () => {
    const { asFragment } = render(
      <TextHTMLOrElementComponent>
        {'<a href="http://cash.app/">String HTML Link</a>'}
      </TextHTMLOrElementComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
