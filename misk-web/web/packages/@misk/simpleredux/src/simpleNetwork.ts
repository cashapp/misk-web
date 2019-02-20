import axios, { AxiosRequestConfig } from "axios"
import { partition } from "lodash-es"
import createCachedSelector from "re-reselect"
import { all, AllEffect, call, put, takeEvery } from "redux-saga/effects"
import { createSelector, OutputSelector, ParametricSelector } from "reselect"
import {
  createAction,
  defaultState,
  defaultRootState,
  getPayloadTag,
  IAction,
  IDefaultState,
  jsonOrString,
  IRootState
} from "."

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
export interface ISimpleNetworkPayload extends IDefaultState {
  requestConfig: AxiosRequestConfig
  tag: string
  url: string
}

export interface IDispatchSimpleNetwork {
  simpleNetworkDelete: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.DELETE, ISimpleNetworkState>
  simpleNetworkFailure: (
    tag: string,
    url: string,
    error: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.FAILURE, ISimpleNetworkState>
  simpleNetworkGet: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.GET, ISimpleNetworkState>
  simpleNetworkHead: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.HEAD, ISimpleNetworkState>
  simpleNetworkPatch: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.PATCH, ISimpleNetworkState>
  simpleNetworkPost: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.POST, ISimpleNetworkState>
  simpleNetworkPut: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.PUT, ISimpleNetworkState>
  simpleNetworkSuccess: (
    tag: string,
    url: string,
    error: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkState>
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
    createAction<SIMPLENETWORK.DELETE, ISimpleNetworkState>(
      SIMPLENETWORK.DELETE,
      {
        simpleTag,
        [tag]: {
          error: null,
          loading: true,
          requestConfig,
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
    createAction<SIMPLENETWORK.FAILURE, ISimpleNetworkState>(
      SIMPLENETWORK.FAILURE,
      {
        simpleTag,
        [tag]: {
          ...error,
          loading: false,
          requestConfig,
          success: false,
          tag,
          url
        }
      }
    ),
  simpleNetworkGet: (
    tag: string = dispatchDefault.tag,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.GET, ISimpleNetworkState>(SIMPLENETWORK.GET, {
      simpleTag,
      [tag]: {
        error: null,
        loading: true,
        requestConfig,
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
    createAction<SIMPLENETWORK.HEAD, ISimpleNetworkState>(SIMPLENETWORK.HEAD, {
      simpleTag,
      [tag]: {
        error: null,
        loading: true,
        requestConfig,
        success: false,
        tag,
        url
      }
    }),
  simpleNetworkPatch: (
    tag: string = dispatchDefault.tag,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.PATCH, ISimpleNetworkState>(
      SIMPLENETWORK.PATCH,
      {
        simpleTag,
        [tag]: {
          data,
          error: null,
          loading: true,
          requestConfig,
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
    createAction<SIMPLENETWORK.POST, ISimpleNetworkState>(SIMPLENETWORK.POST, {
      simpleTag,
      [tag]: {
        data,
        error: null,
        loading: true,
        requestConfig,
        success: false,
        tag,
        url
      }
    }),
  simpleNetworkPut: (
    tag: string = dispatchDefault.tag,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.PUT, ISimpleNetworkState>(SIMPLENETWORK.PUT, {
      simpleTag,
      [tag]: {
        data,
        error: null,
        loading: true,
        requestConfig,
        success: false,
        tag,
        url
      }
    }),
  simpleNetworkSuccess: (
    tag: string = dispatchDefault.tag,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkState>(
      SIMPLENETWORK.SUCCESS,
      {
        simpleTag,
        [tag]: {
          ...data,
          error: null,
          loading: false,
          requestConfig,
          success: true,
          tag,
          url
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

/**
 *
 * Generic handler function for HTTP methods that don't include data in the request
 * - DELETE
 * - GET
 * - HEAD
 */
function* handleBasicRequest(
  action: IAction<SIMPLENETWORK, ISimpleNetworkState>
) {
  try {
    const { tag, url, requestConfig } = getPayloadTag(action.payload)
    const { data } = yield call(
      ActionTypeToAxiosCall[action.type],
      url,
      requestConfig
    )
    yield put(dispatchSimpleNetwork.simpleNetworkSuccess(tag, url, { ...data }))
  } catch (e) {
    const { tag, url } = getPayloadTag(action.payload)
    yield put(dispatchSimpleNetwork.simpleNetworkFailure(tag, url, { ...e }))
  }
}

function* handlePatch(action: IAction<SIMPLENETWORK, ISimpleNetworkState>) {
  try {
    const updateData = jsonOrString(getPayloadTag(action.payload).data)
    const { tag, url, requestConfig } = getPayloadTag(action.payload)
    const { data } = yield call(axios.patch, url, updateData, requestConfig)
    yield put(dispatchSimpleNetwork.simpleNetworkSuccess(tag, url, { ...data }))
  } catch (e) {
    const { tag, url } = getPayloadTag(action.payload)
    yield put(dispatchSimpleNetwork.simpleNetworkFailure(tag, url, { ...e }))
  }
}

function* handlePost(action: IAction<SIMPLENETWORK, ISimpleNetworkState>) {
  try {
    const saveData = jsonOrString(getPayloadTag(action.payload).data)
    const { tag, url, requestConfig } = getPayloadTag(action.payload)
    const { data } = yield call(axios.post, url, saveData, requestConfig)
    yield put(dispatchSimpleNetwork.simpleNetworkSuccess(tag, url, { ...data }))
  } catch (e) {
    const { tag, url } = getPayloadTag(action.payload)
    yield put(dispatchSimpleNetwork.simpleNetworkFailure(tag, url, { ...e }))
  }
}

function* handlePut(action: IAction<SIMPLENETWORK, ISimpleNetworkState>) {
  try {
    const updateData = jsonOrString(getPayloadTag(action.payload).data)
    const { tag, url, requestConfig } = getPayloadTag(action.payload)
    const { data } = yield call(axios.put, url, updateData, requestConfig)
    yield put(dispatchSimpleNetwork.simpleNetworkSuccess(tag, url, { ...data }))
  } catch (e) {
    const { tag, url } = getPayloadTag(action.payload)
    yield put(dispatchSimpleNetwork.simpleNetworkFailure(tag, url, { ...e }))
  }
}

export function* watchSimpleNetworkSagas(): IterableIterator<AllEffect> {
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

/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
export const simpleNetworkState = <
  T extends { simpleNetwork: ISimpleNetworkState }
>(
  state: T
) => state.simpleNetwork

export const simpleNetworkSelector: OutputSelector<
  {},
  any,
  (res: ISimpleNetworkState) => any
> = createSelector(
  simpleNetworkState,
  state => state.toJS()
)

export const getSimpleNetwork: ParametricSelector<
  {},
  string,
  ISimpleNetworkPayload
> = createCachedSelector(
  simpleNetworkState,
  (simpleNetwork: ISimpleNetworkState, tag: string) =>
    simpleNetwork[tag] ? simpleNetwork[tag] : defaultState,
  (state: ISimpleNetworkState, tagResponse: ISimpleNetworkPayload) =>
    tagResponse
)((state, tag) => tag)

export const querySimpleNetwork: ParametricSelector<
  {},
  string,
  ISimpleNetworkPayload
> = createCachedSelector(
  simpleNetworkState,
  (simpleNetwork: ISimpleNetworkState, tag: string) => {
    return partition(Object.keys(simpleNetwork), k => k.startsWith(tag))[0]
      .length > 0
      ? partition(Object.keys(simpleNetwork), k => k.startsWith(tag))[0].map(
          k => simpleNetwork[k]
        )
      : defaultState
  },
  (state: ISimpleNetworkState, tagResponse: ISimpleNetworkPayload) =>
    tagResponse
)((state, tag) => tag)
