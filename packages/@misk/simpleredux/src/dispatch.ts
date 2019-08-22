import { AxiosResponse, AxiosRequestConfig } from "axios"
import {
  IDefaultState,
  IAction,
  createAction,
  simpleSelectorGet
} from "./utilities"
import { SIMPLEFORM, SIMPLENETWORK } from "./action"

/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */

/**
 * SimpleNetwork
 */
export interface ISimpleNetworkPayloadTag extends IDefaultState, AxiosResponse {
  requestConfig: AxiosRequestConfig
  tag: string
  url: string
}

export interface ISimpleNetworkPayload {
  [tag: string]: ISimpleNetworkPayloadTag
}

export interface IDispatchSimpleNetwork {
  simpleNetworkDelete: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.DELETE, ISimpleNetworkPayload>
  simpleNetworkFailure: (
    tag: string,
    url: string,
    error: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.FAILURE, ISimpleNetworkPayload>
  simpleNetworkGet: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.GET, ISimpleNetworkPayload>
  simpleNetworkHead: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.HEAD, ISimpleNetworkPayload>
  simpleNetworkPatch: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.PATCH, ISimpleNetworkPayload>
  simpleNetworkPost: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.POST, ISimpleNetworkPayload>
  simpleNetworkPut: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.PUT, ISimpleNetworkPayload>
  simpleNetworkSuccess: (
    tag: string,
    url: string,
    response: AxiosResponse,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkPayload>
}

interface IDispatchDefault {
  data: any
  error: any
  requestConfig: AxiosRequestConfig
  tag: string
}

const dispatchDefault: IDispatchDefault = {
  data: {},
  error: {},
  requestConfig: {},
  tag: "latest"
}

export const dispatchSimpleNetwork: IDispatchSimpleNetwork = {
  simpleNetworkDelete: (
    tag: string = dispatchDefault.tag,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.DELETE, ISimpleNetworkPayload>(
      SIMPLENETWORK.DELETE,
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
  simpleNetworkFailure: (
    tag: string = dispatchDefault.tag,
    url: string,
    error: any = dispatchDefault.error,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.FAILURE, ISimpleNetworkPayload>(
      SIMPLENETWORK.FAILURE,
      {
        [tag]: {
          data: null,
          config: null,
          headers: null,
          loading: false,
          requestConfig,
          status: 0,
          statusText: "",
          success: false,
          tag,
          url,
          ...error
        }
      }
    ),
  simpleNetworkGet: (
    tag: string = dispatchDefault.tag,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.GET, ISimpleNetworkPayload>(SIMPLENETWORK.GET, {
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
    }),
  simpleNetworkHead: (
    tag: string = dispatchDefault.tag,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.HEAD, ISimpleNetworkPayload>(
      SIMPLENETWORK.HEAD,
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
  simpleNetworkPatch: (
    tag: string = dispatchDefault.tag,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.PATCH, ISimpleNetworkPayload>(
      SIMPLENETWORK.PATCH,
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
  simpleNetworkPost: (
    tag: string = dispatchDefault.tag,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.POST, ISimpleNetworkPayload>(
      SIMPLENETWORK.POST,
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
  simpleNetworkPut: (
    tag: string = dispatchDefault.tag,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.PUT, ISimpleNetworkPayload>(SIMPLENETWORK.PUT, {
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
    }),
  simpleNetworkSuccess: (
    tag: string = dispatchDefault.tag,
    url: string,
    response: AxiosResponse,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkPayload>(
      SIMPLENETWORK.SUCCESS,
      {
        [tag]: {
          error: null,
          loading: false,
          requestConfig,
          success: true,
          tag,
          url,
          ...response
        }
      }
    )
}

/**
 * SimpleForm
 */
export interface ISimpleFormPayloadTag extends IDefaultState {
  oldToggle?: string | boolean
  tag: string
  valueAsString?: string
  valueAsNumber?: number
}

export interface ISimpleFormPayload {
  [tag: string]: ISimpleFormPayloadTag
}

export interface IDispatchSimpleForm {
  simpleFormFailure: (
    tag: string,
    error: any
  ) => IAction<SIMPLEFORM.FAILURE, ISimpleFormPayload>
  simpleFormInput: (
    tag: string,
    data: any
  ) => IAction<SIMPLEFORM.INPUT, ISimpleFormPayload>
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => IAction<SIMPLEFORM.NUMBER, ISimpleFormPayload>
  simpleFormSuccess: (
    tag: string,
    data: any
  ) => IAction<SIMPLEFORM.SUCCESS, ISimpleFormPayload>
  simpleFormToggle: (
    tag: string,
    oldState: any
  ) => IAction<SIMPLEFORM.TOGGLE, ISimpleFormPayload>
}

export const dispatchSimpleForm: IDispatchSimpleForm = {
  simpleFormFailure: (tag: string, error: any) =>
    createAction<SIMPLEFORM.FAILURE, ISimpleFormPayload>(SIMPLEFORM.FAILURE, {
      [tag]: {
        ...error,
        loading: false,
        success: false,
        tag
      }
    }),
  simpleFormInput: (tag: string, data: any) =>
    createAction<SIMPLEFORM.INPUT, ISimpleFormPayload>(SIMPLEFORM.INPUT, {
      [tag]: {
        data,
        error: null,
        loading: true,
        success: false,
        tag
      }
    }),
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) =>
    createAction<SIMPLEFORM.NUMBER, ISimpleFormPayload>(SIMPLEFORM.NUMBER, {
      [tag]: {
        data: valueAsString,
        error: null,
        loading: true,
        success: false,
        tag
      }
    }),
  simpleFormSuccess: (tag: string, data: any) =>
    createAction<SIMPLEFORM.SUCCESS, ISimpleFormPayload>(SIMPLEFORM.SUCCESS, {
      [tag]: {
        ...data,
        error: null,
        loading: false,
        success: true,
        tag
      }
    }),
  simpleFormToggle: (tag: string, oldState: any) =>
    createAction<SIMPLEFORM.TOGGLE, ISimpleFormPayload>(SIMPLEFORM.TOGGLE, {
      [tag]: {
        oldToggle: simpleSelectorGet(oldState, [tag, "data"], false),
        data: null,
        error: null,
        loading: true,
        success: false,
        tag
      }
    })
}
