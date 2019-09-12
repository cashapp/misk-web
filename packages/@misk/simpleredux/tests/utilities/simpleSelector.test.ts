import { get, pick } from "lodash"
import { simpleSelectorGet, simpleSelectorPick } from "src/utilities/simpleSelector"

const state = {
  playground: {
    simpleTag: "playground",
    alpha: {
      bravo: {
        data: "John Doe",
        loading: "maybe"
      }
    },
    charlie: {
      delta: {
        data: "Jane Bond",
        loading: "maybe not"
      }
    }
  }
}

describe("Test simpleSelector functions mirror equivalent lodash functions", () => {
  it("simpleSelectorGet happy path", () => {
    const path = ["alpha", "bravo"]
    const matched = simpleSelectorGet(state.playground, path)
    const expected = get(state.playground, path)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`
      Object {
        "data": "John Doe",
        "loading": "maybe",
      }
    `)
  })

  it("simpleSelectorGet get nested property", () => {
    const path = ["alpha", "bravo", "data"]
    const matched = simpleSelectorGet(state.playground, path)
    const expected = get(state.playground, path)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`"John Doe"`)
  })

  it("simpleSelectorGet get nested property with dot syntax", () => {
    const path = "alpha.bravo.data"
    const matched = simpleSelectorGet(state.playground, path)
    const expected = get(state.playground, path)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`"John Doe"`)
  })

  it("simpleSelectorGet return default value on missing key", () => {
    const path = "alpha.bravo.items"
    const defaultValue: any = []
    const matched = simpleSelectorGet(state.playground, path, defaultValue)
    const expected = get(state.playground, path, defaultValue)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`Array []`)
  })

  it("simpleSelectorPick happy path", () => {
    const paths = ["alpha", "charlie"]
    const matched = simpleSelectorPick(state.playground, paths)
    const expected = pick(state.playground, paths)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`
      Object {
        "alpha": Object {
          "bravo": Object {
            "data": "John Doe",
            "loading": "maybe",
          },
        },
        "charlie": Object {
          "delta": Object {
            "data": "Jane Bond",
            "loading": "maybe not",
          },
        },
      }
    `)
  })

  it("simpleSelectorPick pick nested with dot syntax", () => {
    const paths = ["alpha.bravo.data", "charlie.delta.data"]
    const matched = simpleSelectorPick(state.playground, paths)
    const expected = pick(state.playground, paths)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`
      Object {
        "alpha": Object {
          "bravo": Object {
            "data": "John Doe",
          },
        },
        "charlie": Object {
          "delta": Object {
            "data": "Jane Bond",
          },
        },
      }
    `)
  })
})
