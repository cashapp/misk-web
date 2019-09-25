import { dispatchSimpleRedux } from "src/dispatch"
import { event, tag, url } from "tests/testFixtures"
import { handler } from "src"

describe("handleDispatch functions to handle onChange events", () => {
  it("Handle event with simpleMergeRaw", () => {
    expect(handler.simpleMergeRaw(dispatchSimpleRedux)(event)).toEqual(
      dispatchSimpleRedux.simpleMergeRaw(event.target.value)
    )
  })
  it("Handle event with simpleMerge", () => {
    expect(handler.simpleMerge(dispatchSimpleRedux, tag)(event)).toEqual(
      dispatchSimpleRedux.simpleMerge(tag, event.target.value)
    )
  })
  it("Handle event with simpleMergeData", () => {
    expect(handler.simpleMergeData(dispatchSimpleRedux, tag)(event)).toEqual(
      dispatchSimpleRedux.simpleMergeData(tag, event.target.value)
    )
  })
  it("Handle event with simpleMergeNumber", () => {
    expect(handler.simpleMergeNumber(dispatchSimpleRedux, tag)(0, "0")).toEqual(
      dispatchSimpleRedux.simpleMergeNumber(tag, 0, "0")
    )
  })
  it("Handle event with simpleMergeToggle: oldState = false", () => {
    const oldState = {
      simpleTag: "simpleRedux"
    }
    expect(
      handler.simpleMergeToggle(
        { ...dispatchSimpleRedux, simpleRedux: oldState },
        tag
      )(event)
    ).toEqual(dispatchSimpleRedux.simpleMergeToggle(tag, oldState))
  })
  it("Handle event with simpleMergeToggle: oldState = true", () => {
    const oldState = {
      simpleTag: "simpleRedux",
      [tag]: {
        data: true
      }
    }
    expect(
      handler.simpleMergeToggle(
        { ...dispatchSimpleRedux, simpleRedux: oldState },
        tag
      )(event)
    ).toEqual(dispatchSimpleRedux.simpleMergeToggle(tag, oldState))
  })
  it("Handle event with simpleHttpDelete", () => {
    expect(
      handler.simpleHttpDelete(dispatchSimpleRedux, tag, url)(event)
    ).toEqual(dispatchSimpleRedux.simpleHttpDelete(tag, url))
  })
  it("Handle event with simpleHttpGet", () => {
    expect(handler.simpleHttpGet(dispatchSimpleRedux, tag, url)(event)).toEqual(
      dispatchSimpleRedux.simpleHttpGet(tag, url)
    )
  })
  it("Handle event with simpleHttpHead", () => {
    expect(
      handler.simpleHttpHead(dispatchSimpleRedux, tag, url)(event)
    ).toEqual(dispatchSimpleRedux.simpleHttpHead(tag, url))
  })
  it("Handle event with simpleHttpPatch", () => {
    expect(
      handler.simpleHttpPatch(dispatchSimpleRedux, tag, url)(event)
    ).toEqual(dispatchSimpleRedux.simpleHttpPatch(tag, url, event.target.value))
  })
  it("Handle event with simpleHttpPost", () => {
    expect(
      handler.simpleHttpPost(dispatchSimpleRedux, tag, url)(event)
    ).toEqual(dispatchSimpleRedux.simpleHttpPost(tag, url, event.target.value))
  })
  it("Handle event with simpleHttpPut", () => {
    expect(handler.simpleHttpPut(dispatchSimpleRedux, tag, url)(event)).toEqual(
      dispatchSimpleRedux.simpleHttpPut(tag, url, event.target.value)
    )
  })
})
