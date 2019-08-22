import { get, pick } from "lodash"
import { simpleSelectorGet, simpleSelectorPick } from "src"

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
  it("simpleSelectGet happy path", () => {
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

  it("simpleSelectGet get nested property", () => {
    const path = ["alpha", "bravo", "data"]
    const matched = simpleSelectorGet(state.playground, path)
    const expected = get(state.playground, path)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`"John Doe"`)
  })

  it("simpleSelectGet get nested property with dot syntax", () => {
    const path = "alpha.bravo.data"
    const matched = simpleSelectorGet(state.playground, path)
    const expected = get(state.playground, path)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`"John Doe"`)
  })

  it("simpleSelectGet return default value on missing key", () => {
    const path = "alpha.bravo.items"
    const defaultValue: any = []
    const matched = simpleSelectorGet(state.playground, path, defaultValue)
    const expected = get(state.playground, path, defaultValue)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`Array []`)
  })

  it("simpleSelectPick happy path", () => {
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

  it("simpleSelectPick pick nested with dot syntax", () => {
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
