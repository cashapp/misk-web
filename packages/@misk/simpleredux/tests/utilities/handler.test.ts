import { dispatchSimpleRedux } from "src/dispatch"
import { event, tag, url } from "tests/testFixtures"
import { handler, parseInput, isSyntheticEvent } from "src/utilities/handler"

describe("isSyntheticEvent", () => {
  it("true if SyntheticEvent", () => {
    const syntheticEvent = {
      nativeEvent: 0,
      currentTarget: 0,
      target: 0,
      bubbles: 0,
      cancelable: 0,
      defaultPrevented: 0,
      eventPhase: 0,
      isTrusted: 0,
      preventDefault: () => 0,
      isDefaultPrevented: () => 0,
      stopPropagation: () => 0,
      isPropagationStopped: () => 0,
      persist: () => 0,
      timeStamp: 0,
      type: 0
    }
    expect(isSyntheticEvent(syntheticEvent)).toBeTruthy()
  })
  it("false if not SyntheticEvent", () => {
    expect(isSyntheticEvent(1234)).toBeFalsy()
  })
})

describe("parseInput handles all components onChange inputs", () => {
  it("Generic onChange event.target.value", () => {
    expect(parseInput({ target: { value: 1234 } })).toEqual(1234)
  })
  it("<Slider/> onChange value: number", () => {
    expect(parseInput(1234)).toEqual(1234)
  })
  it("<NumericInput/> onChange valueAsNumber, valueAsString", () => {
    expect(parseInput(1234, "1234")).toEqual("1234")
  })
  it("<TagInput /> onChange values: string[]", () => {
    expect(parseInput(["alpha", "bravo", "charlie"])).toEqual([
      "alpha",
      "bravo",
      "charlie"
    ])
  })
  it("override input as array", () => {
    expect(parseInput([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
  })
  it("override input", () => {
    expect(parseInput(1234)).toEqual(1234)
  })
})

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
  it("Handle <Number/> event with simpleMergeData", () => {
    expect(handler.simpleMergeData(dispatchSimpleRedux, tag)(0, "0")).toEqual(
      dispatchSimpleRedux.simpleMergeData(tag, "0")
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
