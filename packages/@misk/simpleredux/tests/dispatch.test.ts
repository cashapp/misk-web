import { SIMPLEREDUX } from "src/action"
import { dispatchSimpleRedux, dispatchDefault, privateDispatchSimpleRedux } from "src/dispatch"
import { data, error, requestData, tag, url } from './testFixtures'

describe('dispatchSimpleRedux', () => {
  it("simpleFailure", () => {
    const action = {
      type: SIMPLEREDUX.FAILURE,
      payload: {
        [tag]: {
          data: null as any,
          config: null as any,
          headers: null as any,
          loading: false,
          status: 0,
          statusText: "",
          success: false,
          tag,
          ...error
        }
      }
    }
    expect(privateDispatchSimpleRedux.simpleFailure(tag, error)).toEqual(action)
  })

  it("simpleMerge", () => {
    const action = {
      type: SIMPLEREDUX.MERGE,
      payload: {
        error: null as any,
        loading: false,
        success: true,
        ...data
      }
    }
    expect(dispatchSimpleRedux.simpleMergeRaw(data)).toEqual(action)
  })

  it("simpleMergeTag", () => {
    const action = {
      type: SIMPLEREDUX.MERGE,
      payload: {
        [tag]: {
          error: null as any,
          loading: false,
          success: true,
          tag,
          ...data
        }
      }
    }
    expect(dispatchSimpleRedux.simpleMerge(tag, data)).toEqual(action)
  })

  it("simpleMergeNumber", () => {
    const action = {
      type: SIMPLEREDUX.MERGE,
      payload: {
        [tag]: {
          data: "1234",
          error: null as any,
          loading: false,
          success: true,
          tag,
        }
      }
    }
    expect(dispatchSimpleRedux.simpleMergeNumber(tag, 1234, "1234")).toEqual(action)
  })

  it("simpleMergeToggle: oldState = undefined", () => {
    const oldState = {
      simpleTag: "simpleRedux"
    }
    const action = {
      type: SIMPLEREDUX.MERGE,
      payload: {
        [tag]: {
          data: true,
          error: null as any,
          loading: false,
          success: true,
          tag,
        }
      }
    }
    expect(dispatchSimpleRedux.simpleMergeToggle(tag, oldState)).toEqual(action)
  })

  it("simpleMergeToggle: oldState = false", () => {
    const oldState = {
      simpleTag: "simpleRedux",
      [tag]: {
        data: false
      }
    }
    const action = {
      type: SIMPLEREDUX.MERGE,
      payload: {
        [tag]: {
          data: true,
          error: null as any,
          loading: false,
          success: true,
          tag,
        }
      }
    }
    expect(dispatchSimpleRedux.simpleMergeToggle(tag, oldState)).toEqual(action)
  })

  it("simpleMergeToggle: oldState = true", () => {
    const oldState = {
      simpleTag: "simpleRedux",
      [tag]: {
        data: true
      }
    }
    const action = {
      type: SIMPLEREDUX.MERGE,
      payload: {
        [tag]: {
          data: false,
          error: null as any,
          loading: false,
          success: true,
          tag,
        }
      }
    }
    expect(dispatchSimpleRedux.simpleMergeToggle(tag, oldState)).toEqual(action)
  })

  it("simpleHttpDelete", () => {
    const action = {
      type: SIMPLEREDUX.HTTP_DELETE,
      payload: {
        [tag]: {
          data: null as any,
          config: null as any,
          error: null as any,
          headers: null as any,
          loading: true,
          requestConfig: dispatchDefault.requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    }
    expect(dispatchSimpleRedux.simpleHttpDelete(tag, url)).toEqual(action)
  })

  it("simpleHttpGet", () => {
    const action = {
      type: SIMPLEREDUX.HTTP_GET,
      payload: {
        [tag]: {
          data: null as any,
          config: null as any,
          error: null as any,
          headers: null as any,
          loading: true,
          requestConfig: dispatchDefault.requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    }
    expect(dispatchSimpleRedux.simpleHttpGet(tag, url)).toEqual(action)
  })

  it("simpleHttpHead", () => {
    const action = {
      type: SIMPLEREDUX.HTTP_HEAD,
      payload: {
        [tag]: {
          data: null as any,
          config: null as any,
          error: null as any,
          headers: null as any,
          loading: true,
          requestConfig: dispatchDefault.requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    }
    expect(dispatchSimpleRedux.simpleHttpHead(tag, url)).toEqual(action)
  })

  it("simpleHttpPatch", () => {
    const action = {
      type: SIMPLEREDUX.HTTP_PATCH,
      payload: {
        [tag]: {
          data: requestData,
          config: null as any,
          error: null as any,
          headers: null as any,
          loading: true,
          requestConfig: dispatchDefault.requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    }
    expect(dispatchSimpleRedux.simpleHttpPatch(tag, url, requestData)).toEqual(action)
  })

  it("simpleHttpPost", () => {
    const action = {
      type: SIMPLEREDUX.HTTP_POST,
      payload: {
        [tag]: {
          data: requestData,
          config: null as any,
          error: null as any,
          headers: null as any,
          loading: true,
          requestConfig: dispatchDefault.requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    }
    expect(dispatchSimpleRedux.simpleHttpPost(tag, url, requestData)).toEqual(action)
  })

  it("simpleHttpPut", () => {
    const action = {
      type: SIMPLEREDUX.HTTP_PUT,
      payload: {
        [tag]: {
          data: requestData,
          config: null as any,
          error: null as any,
          headers: null as any,
          loading: true,
          requestConfig: dispatchDefault.requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    }
    expect(dispatchSimpleRedux.simpleHttpPut(tag, url, requestData)).toEqual(action)
  })
})
