import { AxiosResponse, AxiosRequestConfig } from "axios"
import { SIMPLEREDUX } from "./action"
import {
  IDefaultState,
  IAction,
  createAction,
  simpleSelectorGet,
  booleanToggle
} from "./utilities"

interface IDispatchDefault {
  data: any
  error: any
  requestConfig: AxiosRequestConfig
}

export const dispatchDefault: IDispatchDefault = {
  data: {},
  error: {},
  requestConfig: {}
}

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
  /**
   * Dispatch state merge action, overwrites state for a specific tag
   * @param tag string to identify domain of state
   * @param data new data that overwrites fields in state[tag]
   */
  simpleMerge: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>

  /**
   * Dispatch state merge action, overwrites entire state
   * @param tag string to identify domain of state
   * @param data new data that overwrites any fields in state
   */
  simpleMergeRaw: (data: any) => IAction<SIMPLEREDUX.MERGE, any>

  // Redux as UI / Field Input Cache
  /**
   * Dispatch state merge action, overwrites state for a specific tag
   * @param tag string to identify domain of state
   * @param data new data that overwrites fields in state[tag].data
   */
  simpleMergeData: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>

  /**
   * Dispatch state merge action, overwrites state for a specific tag
   * @param tag string to identify domain of state
   * @param valueAsNumber new number value as a number
   * @param valueAsString new number value as a string
   */
  simpleMergeNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>

  /**
   * Dispatch state merge action, overwrites state for a specific tag
   * @param tag string to identify domain of state
   * @param oldState old SimpleRedux state, in order to lookup current value of tag
   */
  simpleMergeToggle: (
    tag: string,
    oldState: any
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>

  // Async HTTP Network Calls

  /**
   * Dispatch HTTP Delete action, returns response/failure to a specific tag
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param requestConfig optional AxiosRequestConfig to configure the request
   */
  simpleHttpDelete: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_DELETE, ISimpleReduxPayload>

  /**
   * Dispatch HTTP Get action, returns response/failure to a specific tag
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param requestConfig optional AxiosRequestConfig to configure the request
   */
  simpleHttpGet: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_GET, ISimpleReduxPayload>

  /**
   * Dispatch HTTP Head action, returns response/failure to a specific tag
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param requestConfig optional AxiosRequestConfig to configure the request
   */
  simpleHttpHead: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_HEAD, ISimpleReduxPayload>

  /**
   * Dispatch HTTP Patch action, returns response/failure to a specific tag
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param data data to include in request body
   * @param requestConfig optional AxiosRequestConfig to configure the request
   */
  simpleHttpPatch: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_PATCH, ISimpleReduxPayload>

  /**
   * Dispatch HTTP Post action, returns response/failure to a specific tag
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param data data to include in request body
   * @param requestConfig optional AxiosRequestConfig to configure the request
   */
  simpleHttpPost: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_POST, ISimpleReduxPayload>

  /**
   * Dispatch HTTP Put action, returns response/failure to a specific tag
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param data data to include in request body
   * @param requestConfig optional AxiosRequestConfig to configure the request
   */
  simpleHttpPut: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLEREDUX.HTTP_PUT, ISimpleReduxPayload>
}

interface IPrivateDispatchSimpleRedux extends IDispatchSimpleRedux {
  /**
   * Dispatch failure action, usually for error encountered in Redux saga
   * @param tag string to identify domain of state
   * @param error object with error fields
   */
  simpleFailure: (
    tag: string,
    error: any
  ) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>
}

/**
 * SimpleRedux Dispatch Object
 * * Comprised of functions that dispatch Actions with standard defaults and any required passed in input
 * * dispatchSimpleRedux Object is used in any Redux connected component to initiate Redux Saga provided functionality
 */
export const dispatchSimpleRedux: IDispatchSimpleRedux = {
  // Lifecycle
  simpleMergeRaw: (data: any) =>
    createAction<SIMPLEREDUX.MERGE, any>(SIMPLEREDUX.MERGE, {
      ...data,
      error: null,
      loading: false,
      success: true
    }),
  simpleMerge: (tag: string, data: any = dispatchDefault.data) =>
    createAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>(SIMPLEREDUX.MERGE, {
      [tag]: {
        error: null,
        loading: false,
        success: true,
        tag,
        ...data
      }
    }),
  // Redux as UI / Field Input Cache
  simpleMergeData: (tag: string, data: any = dispatchDefault.data) =>
    createAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>(SIMPLEREDUX.MERGE, {
      [tag]: {
        data,
        error: null,
        loading: false,
        success: true,
        tag
      }
    }),
  simpleMergeNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) =>
    createAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>(SIMPLEREDUX.MERGE, {
      [tag]: {
        data: valueAsString,
        error: null,
        loading: false,
        success: true,
        tag
      }
    }),
  simpleMergeToggle: (tag: string, oldState: any) =>
    createAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>(SIMPLEREDUX.MERGE, {
      [tag]: {
        data: booleanToggle(simpleSelectorGet(oldState, [tag, "data"], false)),
        error: null,
        loading: false,
        success: true,
        tag
      }
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
    )
}

export const privateDispatchSimpleRedux: IPrivateDispatchSimpleRedux = {
  ...dispatchSimpleRedux,
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
    )
}
