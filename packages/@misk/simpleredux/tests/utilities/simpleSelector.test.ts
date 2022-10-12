import { get, invert, pick } from "lodash"
import {
  simpleSelectorGet,
  simpleSelectorPick,
  simpleSelectorPickTransform
} from "src/utilities/simpleSelector"

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
    },
    echo: {
      data: "Goldfinger",
      loading: "maybe"
    },
    foxtrot: {
      data: "M",
      loading: "maybe not"
    },
    golf: {
      response: {
        data: "Q"
      }
    },
    hotel: {
      response: {
        data: "California"
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
      {
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
    expect(matched).toMatchInlineSnapshot(`[]`)
  })

  it("simpleSelectorPick happy path", () => {
    const paths = ["alpha", "charlie"]
    const matched = simpleSelectorPick(state.playground, paths)
    const expected = pick(state.playground, paths)
    expect(matched).toEqual(expected)
    expect(matched).toMatchInlineSnapshot(`
      {
        "alpha": {
          "bravo": {
            "data": "John Doe",
            "loading": "maybe",
          },
        },
        "charlie": {
          "delta": {
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
      {
        "alpha": {
          "bravo": {
            "data": "John Doe",
          },
        },
        "charlie": {
          "delta": {
            "data": "Jane Bond",
          },
        },
      }
    `)
  })

  it("simpleSelectorPickTransform happy path", () => {
    const paths = ["echo", "foxtrot"]
    const keyLookup = invert({
      ECHO: "echo",
      FOXTROT: "foxtrot"
    })
    const keyPathLookup = {
      echo: "data",
      foxtrot: "data"
    }
    const matched = simpleSelectorPickTransform(
      state.playground,
      paths,
      keyLookup,
      keyPathLookup
    )
    const expected = {
      ECHO: "Goldfinger",
      FOXTROT: "M"
    }
    expect(matched).toEqual(expected)
  })

  it("simpleSelectorPickTransform happy path all same key path", () => {
    const paths = ["echo", "foxtrot"]
    const keyLookup = invert({
      ECHO: "echo",
      FOXTROT: "foxtrot"
    })
    const keyPathLookup = "data"
    const matched = simpleSelectorPickTransform(
      state.playground,
      paths,
      keyLookup,
      keyPathLookup
    )
    const expected = {
      ECHO: "Goldfinger",
      FOXTROT: "M"
    }
    expect(matched).toEqual(expected)
  })

  it("simpleSelectorPickTransform nested happy path", () => {
    const paths = ["golf", "hotel"]
    const keyLookup = invert({
      GOLF: "golf",
      HOTEL: "hotel"
    })
    const keyPathLookup = "response.data"
    const matched = simpleSelectorPickTransform(
      state.playground,
      paths,
      keyLookup,
      keyPathLookup
    )
    const expected = {
      GOLF: "Q",
      HOTEL: "California"
    }
    expect(matched).toEqual(expected)
  })

  it("simpleSelectorPickTransform nested happy path all same key path", () => {
    const paths = ["alpha", "charlie"]
    const keyLookup = invert({
      ALPHA: "alpha",
      CHARLIE: "charlie"
    })
    const keyPathLookup = {
      alpha: "bravo.data",
      charlie: "delta.data"
    }
    const matched = simpleSelectorPickTransform(
      state.playground,
      paths,
      keyLookup,
      keyPathLookup
    )
    const expected = {
      ALPHA: "John Doe",
      CHARLIE: "Jane Bond"
    }
    expect(matched).toEqual(expected)
  })
})
