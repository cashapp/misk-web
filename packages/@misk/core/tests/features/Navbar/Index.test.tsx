import { choose } from "src/features/Navbar"

describe("Navbar choose utility", () => {
  it("happy path", () => {
    expect(choose(false, "prop", "remote")).toBe("remote")
    expect(choose(true, "prop", "remote")).toBe("prop")
    expect(choose(true, null, "remote")).toBe("remote")
    expect(choose(true, undefined, "remote")).toBe("remote")
  })
})
