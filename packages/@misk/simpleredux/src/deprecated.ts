import { AxiosResponse, AxiosRequestConfig } from "axios"
import { SIMPLEREDUX } from "./action"
import { IAction, IRootState } from "./utilities"
import {
  ISimpleReduxPayload,
  dispatchDefault,
  privateDispatchSimpleRedux
} from "./dispatch"
import { dispatchSimpleRedux } from "src"
import { SimpleReduxReducer } from "./reducer"
import { watchSimpleReduxSagas } from "./saga"

/** All Deprecated APIs live here for long term compatability */

const deprecatedCall = (oldName: String, newSignature: String) =>
  console.warn(`@misk/simpleredux::${oldName} is deprecated and will be removed.
Use @misk/simpleredux::${newSignature} instead.
Migration instructions: https://cashapp.github.io/misk-web/docs/guides/changelog.`)

/** DEPRECATED: Use [dispatchSimpleRedux] instead */
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
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>
}

/** DEPRECATED: Use [dispatchSimpleRedux] instead */
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
    return privateDispatchSimpleRedux.simpleFailure(tag, error)
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
      "simpleMergeTag(tag, { requestConfig?, response, url? })"
    )
    return dispatchSimpleRedux.simpleMerge(tag, {
      ...requestConfig,
      ...response,
      url
    })
  }
}

/** DEPRECATED: Use [dispatchSimpleRedux] instead */
export interface IDispatchSimpleForm {
  simpleFormFailure: (
    tag: string,
    error: any
  ) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>
  simpleFormInput: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>
  simpleFormSuccess: (
    tag: string,
    data: any
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>
  simpleFormToggle: (
    tag: string,
    oldState: any
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>
}

/** DEPRECATED: Use [dispatchSimpleRedux] instead */
export const dispatchSimpleForm: IDispatchSimpleForm = {
  simpleFormFailure: (tag: string, error: any) => {
    deprecatedCall("simpleFormFailure", "simpleFailure(tag, error)")
    return privateDispatchSimpleRedux.simpleFailure(tag, error)
  },
  simpleFormInput: (tag: string, data: any) => {
    deprecatedCall("simpleFormInput", "simpleMergeTag(tag, data)")
    return dispatchSimpleRedux.simpleMerge(tag, data)
  },
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => {
    deprecatedCall(
      "simpleFormNumber",
      "simpleMergeNumber(tag, valueAsNumber, valueAsString)"
    )
    return dispatchSimpleRedux.simpleMergeNumber(
      tag,
      valueAsNumber,
      valueAsString
    )
  },
  simpleFormSuccess: (tag: string, data: any) => {
    deprecatedCall("simpleFormSuccess", "simpleMergeTag(tag, data)")
    return dispatchSimpleRedux.simpleMerge(tag, data)
  },
  simpleFormToggle: (tag: string, oldState: any) => {
    deprecatedCall("simpleFormToggle", "simpleMergeToggle(tag, oldState)")
    return dispatchSimpleRedux.simpleMergeToggle(tag, oldState)
  }
}

/** DEPRECATED: Use [SimpleReduxReducer] instead */
export const SimpleNetworkReducer = SimpleReduxReducer

/** DEPRECATED: Use [ISimpleReduxState] instead */
export interface ISimpleNetworkState extends IRootState {
  [tag: string]: any | ISimpleReduxPayload
}

/** DEPRECATED: Use [ISimpleReduxImmutableState] instead */
export interface ISimpleNetworkImmutableState {
  toJS: () => ISimpleNetworkState
}

/** DEPRECATED: Use [SimpleReduxReducer] instead */
export const SimpleFormReducer = SimpleReduxReducer

/** DEPRECATED: Use [ISimpleReduxState] instead */
export interface ISimpleFormState extends IRootState {
  [tag: string]: any | ISimpleReduxPayload
}

/** DEPRECATED: Use [ISimpleReduxImmutableState] instead */
export interface ISimpleFormImmutableState {
  toJS: () => ISimpleFormState
}

/** DEPRECATED: Use [watchSimpleReduxSagas] instead */
export const watchSimpleFormSagas = watchSimpleReduxSagas

/** DEPRECATED: Use [watchSimpleReduxSagas] instead */
export const watchSimpleNetworkSagas = watchSimpleReduxSagas
