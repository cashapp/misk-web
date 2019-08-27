import { AxiosResponse, AxiosRequestConfig } from "axios"
import { SIMPLEREDUX } from "./action"
import {
  IDefaultState,
  IAction,
  createAction,
  simpleSelectorGet
} from "./utilities"

/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export interface ISimpleCachePayloadTag extends IDefaultState {
  oldToggle?: string | boolean
  tag: string
  valueAsString?: string
  valueAsNumber?: number
}

export interface ISimpleHttpPayloadTag extends IDefaultState, AxiosResponse {
  requestConfig: AxiosRequestConfig
  tag: string
  url: string
}

export type ISimpleReduxPayloadTag =
  | ISimpleCachePayloadTag
  | ISimpleHttpPayloadTag

export interface ISimpleReduxPayload {
  [tag: string]: ISimpleReduxPayloadTag
}

export interface IDispatchSimpleRedux {
  // Lifecycle
  simpleSuccess: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.SUCCESS, ISimpleReduxPayload>
  simpleFailure: (
    tag: string,
    error: any
  ) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>
  simpleMerge: (data: any) => IAction<SIMPLEREDUX.MERGE, any>

  // Async HTTP Network Calls
  simpleHttpDelete: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_DELETE, ISimpleReduxPayload>
  simpleHttpGet: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_GET, ISimpleReduxPayload>
  simpleHttpHead: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_HEAD, ISimpleReduxPayload>
  simpleHttpPatch: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_PATCH, ISimpleReduxPayload>
  simpleHttpPost: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_POST, ISimpleReduxPayload>
  simpleHttpPut: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_PUT, ISimpleReduxPayload>

  // Redux as UI / Field Input Cache
  simpleCache: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.CACHE, ISimpleReduxPayload>
  simpleCacheNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => IAction<SIMPLEREDUX.CACHE_NUMBER, ISimpleReduxPayload>
  simpleCacheToggle: (
    tag: string,
    oldState: any
  ) => IAction<SIMPLEREDUX.CACHE_TOGGLE, ISimpleReduxPayload>
}

interface IPrivateDispatchSimpleRedux extends IDispatchSimpleRedux {
  // Lifecycle
  simpleSuccess: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.SUCCESS, ISimpleReduxPayload>
  simpleFailure: (
    tag: string,
    error: any
  ) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>
  simpleMerge: (data: any) => IAction<SIMPLEREDUX.MERGE, any>
}

export const dispatchSimpleRedux: IPrivateDispatchSimpleRedux = {
  // Lifecycle
  simpleSuccess: (tag: string, data: any = dispatchDefault.data) =>
    createAction<SIMPLEREDUX.SUCCESS, ISimpleReduxPayload>(
      SIMPLEREDUX.SUCCESS,
      {
        [tag]: {
          error: null,
          loading: false,
          success: true,
          tag,
          ...data
        }
      }
    ),
  simpleFailure: (tag: string, error: any = dispatchDefault.error) =>
    createAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>(
      SIMPLEREDUX.FAILURE,
      {
        [tag]: {
          data: null,
          config: null,
          headers: null,
          loading: false,
          status: 0,
          statusText: "",
          success: false,
          tag,
          ...error
        }
      }
    ),
  simpleMerge: (data: any) =>
    createAction<SIMPLEREDUX.MERGE, any>(SIMPLEREDUX.MERGE, {
      ...data,
      error: null,
      loading: false,
      success: true
    }),
  // Async HTTP Network Calls
  simpleHttpDelete: (
    tag: string,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLEREDUX.HTTP_DELETE, ISimpleReduxPayload>(
      SIMPLEREDUX.HTTP_DELETE,
      {
        [tag]: {
          data: null,
          config: null,
          error: null,
          headers: null,
          loading: true,
          requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    ),

  simpleHttpGet: (
    tag: string,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLEREDUX.HTTP_GET, ISimpleReduxPayload>(
      SIMPLEREDUX.HTTP_GET,
      {
        [tag]: {
          data: null,
          config: null,
          error: null,
          headers: null,
          loading: true,
          requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    ),
  simpleHttpHead: (
    tag: string,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLEREDUX.HTTP_HEAD, ISimpleReduxPayload>(
      SIMPLEREDUX.HTTP_HEAD,
      {
        [tag]: {
          data: null,
          config: null,
          error: null,
          headers: null,
          loading: true,
          requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    ),
  simpleHttpPatch: (
    tag: string,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLEREDUX.HTTP_PATCH, ISimpleReduxPayload>(
      SIMPLEREDUX.HTTP_PATCH,
      {
        [tag]: {
          data,
          config: null,
          error: null,
          headers: null,
          loading: true,
          requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    ),
  simpleHttpPost: (
    tag: string,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLEREDUX.HTTP_POST, ISimpleReduxPayload>(
      SIMPLEREDUX.HTTP_POST,
      {
        [tag]: {
          data,
          config: null,
          error: null,
          headers: null,
          loading: true,
          requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    ),
  simpleHttpPut: (
    tag: string,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLEREDUX.HTTP_PUT, ISimpleReduxPayload>(
      SIMPLEREDUX.HTTP_PUT,
      {
        [tag]: {
          data,
          config: null,
          error: null,
          headers: null,
          loading: true,
          requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url
        }
      }
    ),
  // Redux as UI / Field Input Cache
  simpleCache: (tag: string, data: any) =>
    createAction<SIMPLEREDUX.CACHE, ISimpleReduxPayload>(SIMPLEREDUX.CACHE, {
      [tag]: {
        data,
        error: null,
        loading: true,
        success: false,
        tag
      }
    }),
  simpleCacheNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) =>
    createAction<SIMPLEREDUX.CACHE_NUMBER, ISimpleReduxPayload>(
      SIMPLEREDUX.CACHE_NUMBER,
      {
        [tag]: {
          data: valueAsString,
          error: null,
          loading: true,
          success: false,
          tag
        }
      }
    ),
  simpleCacheToggle: (tag: string, oldState: any) =>
    createAction<SIMPLEREDUX.CACHE_TOGGLE, ISimpleReduxPayload>(
      SIMPLEREDUX.CACHE_TOGGLE,
      {
        [tag]: {
          oldToggle: simpleSelectorGet(oldState, [tag, "data"], false),
          data: null,
          error: null,
          loading: true,
          success: false,
          tag
        }
      }
    )
}

const deprecatedCall = (oldName: String, newSignature: String) =>
  console.warn(`@misk/simpleredux::${oldName} is deprecated and will be removed.
  Use @misk/simpleredux::${newSignature} instead. Migration instructions: https://cashapp.github.io/misk-web/docs/guides/changelog.`)

/**
 * DEPRECATED SimpleNetwork
 */
export interface IDispatchSimpleNetwork {
  simpleNetworkDelete: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_DELETE, ISimpleReduxPayload>
  simpleNetworkFailure: (
    tag: string,
    url: string,
    error: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>
  simpleNetworkGet: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_GET, ISimpleReduxPayload>
  simpleNetworkHead: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_HEAD, ISimpleReduxPayload>
  simpleNetworkPatch: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_PATCH, ISimpleReduxPayload>
  simpleNetworkPost: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_POST, ISimpleReduxPayload>
  simpleNetworkPut: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_PUT, ISimpleReduxPayload>
  simpleNetworkSuccess: (
    tag: string,
    url: string,
    response: AxiosResponse,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.SUCCESS, ISimpleReduxPayload>
}

interface IDispatchDefault {
  data: any
  error: any
  requestConfig: AxiosRequestConfig
}

const dispatchDefault: IDispatchDefault = {
  data: {},
  error: {},
  requestConfig: {}
}

export const dispatchSimpleNetwork: IDispatchSimpleNetwork = {
  simpleNetworkDelete: (
    tag: string,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) => {
    deprecatedCall(
      "simpleNetworkDelete",
      "simpleHttpDelete(tag, url, requestConfig?)"
    )
    return dispatchSimpleRedux.simpleHttpDelete(tag, url, requestConfig)
  },
  simpleNetworkFailure: (
    tag: string,
    url: string,
    error: any = dispatchDefault.error,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) => {
    deprecatedCall("simpleNetworkFailure", "simpleFailure(tag, error)")
    return dispatchSimpleRedux.simpleFailure(tag, error)
  },
  simpleNetworkGet: (
    tag: string,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) => {
    deprecatedCall(
      "simpleNetworkGet",
      "simpleHttpGet(tag, url, requestConfig?)"
    )
    return dispatchSimpleRedux.simpleHttpGet(tag, url, requestConfig)
  },
  simpleNetworkHead: (
    tag: string,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) => {
    deprecatedCall(
      "simpleNetworkHead",
      "simpleHttpHead(tag, url, requestConfig?)"
    )
    return dispatchSimpleRedux.simpleHttpHead(tag, url, requestConfig)
  },
  simpleNetworkPatch: (
    tag: string,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) => {
    deprecatedCall(
      "simpleNetworkPatch",
      "simpleHttpPatch(tag, url, data?, requestConfig?)"
    )
    return dispatchSimpleRedux.simpleHttpPatch(tag, url, data, requestConfig)
  },
  simpleNetworkPost: (
    tag: string,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) => {
    deprecatedCall(
      "simpleNetworkPost",
      "simpleHttpPost(tag, url, data?, requestConfig?)"
    )
    return dispatchSimpleRedux.simpleHttpPost(tag, url, data, requestConfig)
  },
  simpleNetworkPut: (
    tag: string,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) => {
    deprecatedCall(
      "simpleNetworkPut",
      "simpleHttpPut(tag, url, data?, requestConfig?)"
    )
    return dispatchSimpleRedux.simpleHttpPut(tag, url, data, requestConfig)
  },
  simpleNetworkSuccess: (
    tag: string,
    url: string,
    response: AxiosResponse,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) => {
    deprecatedCall(
      "simpleNetworkSuccess",
      "simpleSuccess(tag, { requestConfig?, response, url? })"
    )
    return dispatchSimpleRedux.simpleSuccess(tag, {
      requestConfig,
      response,
      url
    })
  }
}

/**
 * DEPRECATED SimpleForm
 */
export interface IDispatchSimpleForm {
  simpleFormFailure: (
    tag: string,
    error: any
  ) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>
  simpleFormInput: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.CACHE, ISimpleReduxPayload>
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => IAction<SIMPLEREDUX.CACHE_NUMBER, ISimpleReduxPayload>
  simpleFormSuccess: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.SUCCESS, ISimpleReduxPayload>
  simpleFormToggle: (
    tag: string,
    oldState: any
  ) => IAction<SIMPLEREDUX.CACHE_TOGGLE, ISimpleReduxPayload>
}

export const dispatchSimpleForm: IDispatchSimpleForm = {
  simpleFormFailure: (tag: string, error: any) => {
    deprecatedCall("simpleFormFailure", "simpleFailure(tag, error)")
    return dispatchSimpleRedux.simpleFailure(tag, error)
  },
  simpleFormInput: (tag: string, data: any) => {
    deprecatedCall("simpleFormInput", "simpleCache(tag, data)")
    return dispatchSimpleRedux.simpleCache(tag, data)
  },
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => {
    deprecatedCall(
      "simpleFormNumber",
      "simpleCacheNumber(tag, valueAsNumber, valueAsString)"
    )
    return dispatchSimpleRedux.simpleCacheNumber(
      tag,
      valueAsNumber,
      valueAsString
    )
  },
  simpleFormSuccess: (tag: string, data: any) => {
    deprecatedCall("simpleFormSuccess", "simpleSuccess(tag, data)")
    return dispatchSimpleRedux.simpleSuccess(tag, data)
  },
  simpleFormToggle: (tag: string, oldState: any) => {
    deprecatedCall("simpleFormToggle", "simpleCacheToggle(tag, oldState)")
    return dispatchSimpleRedux.simpleCacheToggle(tag, oldState)
  }
}
