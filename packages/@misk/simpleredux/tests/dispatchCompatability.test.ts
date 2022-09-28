import { dispatchSimpleRedux, privateDispatchSimpleRedux } from "src/dispatch"
import { data, error, requestData, tag, url } from "./testFixtures"
import { dispatchSimpleNetwork, dispatchSimpleForm } from "src"

describe("dispatchSimpleNetwork", () => {
  it("simpleNetworkFailure", () => {
    const error = { errorField1: "Null field encountered. Saga failed." }
    expect(dispatchSimpleNetwork.simpleNetworkFailure(tag, url, error)).toEqual(
      privateDispatchSimpleRedux.simpleFailure(tag, error)
    )
  })

  it("simpleNetworkSuccess", () => {
    expect(
      dispatchSimpleNetwork.simpleNetworkSuccess(tag, url, {
        config: null,
        ...data,
        headers: {} 
      })
    ).toEqual(
      dispatchSimpleRedux.simpleMerge(tag, {
        config: null,
        ...data,
        headers: {},
        url
      })
    )
  })

  it("simpleNetworkDelete", () => {
    expect(dispatchSimpleNetwork.simpleNetworkDelete(tag, url)).toEqual(
      dispatchSimpleRedux.simpleHttpDelete(tag, url)
    )
  })

  it("simpleNetworkGet", () => {
    expect(dispatchSimpleNetwork.simpleNetworkGet(tag, url)).toEqual(
      dispatchSimpleRedux.simpleHttpGet(tag, url)
    )
  })

  it("simpleNetworkHead", () => {
    expect(dispatchSimpleNetwork.simpleNetworkHead(tag, url)).toEqual(
      dispatchSimpleRedux.simpleHttpHead(tag, url)
    )
  })

  it("simpleNetworkPatch", () => {
    expect(
      dispatchSimpleNetwork.simpleNetworkPatch(tag, url, requestData)
    ).toEqual(dispatchSimpleRedux.simpleHttpPatch(tag, url, requestData))
  })

  it("simpleNetworkPost", () => {
    expect(
      dispatchSimpleNetwork.simpleNetworkPost(tag, url, requestData)
    ).toEqual(dispatchSimpleRedux.simpleHttpPost(tag, url, requestData))
  })

  it("simpleNetworkPut", () => {
    expect(
      dispatchSimpleNetwork.simpleNetworkPut(tag, url, requestData)
    ).toEqual(dispatchSimpleRedux.simpleHttpPut(tag, url, requestData))
  })
})

describe("dispatchSimpleForm", () => {
  it("simpleFormFailure", () => {
    expect(dispatchSimpleForm.simpleFormFailure(tag, error)).toEqual(
      privateDispatchSimpleRedux.simpleFailure(tag, error)
    )
  })

  it("simpleFormSuccess", () => {
    expect(dispatchSimpleForm.simpleFormSuccess(tag, data)).toEqual(
      dispatchSimpleRedux.simpleMerge(tag, data)
    )
  })

  it("simpleFormInput", () => {
    expect(dispatchSimpleForm.simpleFormInput(tag, data)).toEqual(
      dispatchSimpleRedux.simpleMergeData(tag, data)
    )
  })

  it("simpleFormNumber", () => {
    expect(dispatchSimpleForm.simpleFormNumber(tag, 1234, "1234")).toEqual(
      dispatchSimpleRedux.simpleMergeData(tag, "1234")
    )
  })

  it("simpleFormToggle: oldState = undefined", () => {
    const oldState = {
      simpleTag: "simpleRedux"
    }
    expect(dispatchSimpleForm.simpleFormToggle(tag, oldState)).toEqual(
      dispatchSimpleRedux.simpleMergeToggle(tag, oldState)
    )
  })

  it("simpleFormToggle: oldState = false", () => {
    const oldState = {
      simpleTag: "simpleRedux",
      [tag]: {
        data: false
      }
    }
    expect(dispatchSimpleForm.simpleFormToggle(tag, oldState)).toEqual(
      dispatchSimpleRedux.simpleMergeToggle(tag, oldState)
    )
  })

  it("simpleFormToggle: oldState = true", () => {
    const oldState = {
      simpleTag: "simpleRedux",
      [tag]: {
        data: true
      }
    }
    expect(dispatchSimpleForm.simpleFormToggle(tag, oldState)).toEqual(
      dispatchSimpleRedux.simpleMergeToggle(tag, oldState)
    )
  })
})
