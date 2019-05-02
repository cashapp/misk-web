import React from "react"
import { cleanup, render } from "react-testing-library"
import { SampleTableComponent } from "../../src/components"

describe("SampleTableComponent", () => {
  afterEach(cleanup)
  it("SampleTableComponent skeleton UI", () => {
    const { asFragment } = render(
      <SampleTableComponent
        data={{ test: [] }}
        rows={5}
        url={"http://test.com/"}
        tag={"test tag"}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("SampleTableComponent can render with data", () => {
    const { asFragment } = render(
      <SampleTableComponent
        data={{
          cars: [
            { "column alpha": 1, "column bravo": 2 },
            { "column alpha": 3, "column bravo": 4 }
          ]
        }}
        rows={5}
        url={"http://test.com/"}
        tag={"test tag"}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
