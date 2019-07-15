import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { all, call, put, takeEvery } from "redux-saga/effects"
import {
  createAction,
  defaultRootState,
  getFirstTag,
  IAction,
  IDefaultState,
  jsonOrString,
  IRootState,
  SimpleReduxSaga
} from "./utilities"

const simpleTag = "simpleNetwork"

/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export enum SIMPLENETWORK {
  DELETE = "SIMPLENETWORK_DELETE",
  FAILURE = "SIMPLENETWORK_FAILURE",
  GET = "SIMPLENETWORK_GET",
  HEAD = "SIMPLENETWORK_HEAD",
  PATCH = "SIMPLENETWORK_PATCH",
  POST = "SIMPLENETWORK_POST",
  PUT = "SIMPLENETWORK_PUT",
  SUCCESS = "SIMPLENETWORK_SUCCESS"
}

/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
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
 * Sagas are generating functions that consume actions and
 * pass either latest (takeLatest) or every (takeEvery) action
 * to a handling generating function.
 *
 * Handling function is where obtaining web resources is done
 * Web requests are done within try/catch so that
 *  if request fails: a failure action is dispatched
 *  if request succeeds: a success action with the data is dispatched
 * Further processing of the data should be minimized within the handling
 *  function to prevent unhelpful errors. Ie. a failed request error is
 *  returned but it actually was just a parsing error within the try/catch.
 */

const ActionTypeToAxiosCall: { [key: string]: any } = {
  [SIMPLENETWORK.DELETE]: axios.delete,
  [SIMPLENETWORK.GET]: axios.get,
  [SIMPLENETWORK.HEAD]: axios.head,
  [SIMPLENETWORK.PATCH]: axios.patch,
  [SIMPLENETWORK.POST]: axios.post,
  [SIMPLENETWORK.PUT]: axios.put
}

const responseAndData = (response: AxiosResponse) => {
  const data =
    typeof response.data === "string" ? { data: response.data } : response.data
  return { ...response, ...data }
}

const responseAndError = (error: { response: AxiosResponse }) => ({
  ...error,
  ...error.response
})

/**
 *
 * Generic handler function for HTTP methods that don't include data in the request
 * - DELETE
 * - GET
 * - HEAD
 */
function* handleBasicRequest(
  action: IAction<SIMPLENETWORK, ISimpleNetworkPayload>
) {
  try {
    const { tag, url, requestConfig } = getFirstTag<ISimpleNetworkPayloadTag>(
      action.payload
    )
    const response = yield call(
      ActionTypeToAxiosCall[action.type],
      url,
      requestConfig
    )
    yield put(
      dispatchSimpleNetwork.simpleNetworkSuccess(
        tag,
        url,
        responseAndData(response)
      )
    )
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleNetworkPayloadTag>(action.payload)
    yield put(
      dispatchSimpleNetwork.simpleNetworkFailure(tag, url, responseAndError(e))
    )
  }
}

function* handlePatch(action: IAction<SIMPLENETWORK, ISimpleNetworkPayload>) {
  try {
    const updateData = jsonOrString(
      getFirstTag<ISimpleNetworkPayloadTag>(action.payload).data
    )
    const { tag, url, requestConfig } = getFirstTag<ISimpleNetworkPayloadTag>(
      action.payload
    )
    const response = yield call(axios.patch, url, updateData, requestConfig)
    yield put(
      dispatchSimpleNetwork.simpleNetworkSuccess(
        tag,
        url,
        responseAndData(response)
      )
    )
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleNetworkPayloadTag>(action.payload)
    yield put(
      dispatchSimpleNetwork.simpleNetworkFailure(tag, url, responseAndError(e))
    )
  }
}

function* handlePost(action: IAction<SIMPLENETWORK, ISimpleNetworkPayload>) {
  try {
    const saveData = jsonOrString(
      getFirstTag<ISimpleNetworkPayloadTag>(action.payload).data
    )
    const { tag, url, requestConfig } = getFirstTag<ISimpleNetworkPayloadTag>(
      action.payload
    )
    const response = yield call(axios.post, url, saveData, requestConfig)
    yield put(
      dispatchSimpleNetwork.simpleNetworkSuccess(
        tag,
        url,
        responseAndData(response)
      )
    )
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleNetworkPayloadTag>(action.payload)
    yield put(
      dispatchSimpleNetwork.simpleNetworkFailure(tag, url, responseAndError(e))
    )
  }
}

function* handlePut(action: IAction<SIMPLENETWORK, ISimpleNetworkPayload>) {
  try {
    const updateData = jsonOrString(
      getFirstTag<ISimpleNetworkPayloadTag>(action.payload).data
    )
    const { tag, url, requestConfig } = getFirstTag<ISimpleNetworkPayloadTag>(
      action.payload
    )
    const response = yield call(axios.put, url, updateData, requestConfig)
    yield put(
      dispatchSimpleNetwork.simpleNetworkSuccess(
        tag,
        url,
        responseAndData(response)
      )
    )
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleNetworkPayloadTag>(action.payload)
    yield put(
      dispatchSimpleNetwork.simpleNetworkFailure(tag, url, responseAndError(e))
    )
  }
}

export function* watchSimpleNetworkSagas(): SimpleReduxSaga {
  yield all([
    takeEvery(SIMPLENETWORK.DELETE, handleBasicRequest),
    takeEvery(SIMPLENETWORK.GET, handleBasicRequest),
    takeEvery(SIMPLENETWORK.HEAD, handleBasicRequest),
    takeEvery(SIMPLENETWORK.PATCH, handlePatch),
    takeEvery(SIMPLENETWORK.POST, handlePost),
    takeEvery(SIMPLENETWORK.PUT, handlePut)
  ])
}

/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialState = defaultRootState(simpleTag)

/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export function SimpleNetworkReducer(
  state = initialState,
  action: IAction<SIMPLENETWORK, {}>
) {
  switch (action.type) {
    case SIMPLENETWORK.DELETE:
    case SIMPLENETWORK.FAILURE:
    case SIMPLENETWORK.GET:
    case SIMPLENETWORK.HEAD:
    case SIMPLENETWORK.PATCH:
    case SIMPLENETWORK.POST:
    case SIMPLENETWORK.PUT:
    case SIMPLENETWORK.SUCCESS:
      return state.merge(action.payload)
    default:
      return state
  }
}

/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */

export interface ISimpleNetworkState extends IRootState {
  [tag: string]: any | ISimpleNetworkPayload
}

export interface ISimpleNetworkImmutableState {
  toJS: () => ISimpleNetworkState
}
