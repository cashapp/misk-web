import {
  createAction,
  defaultState,
  IAction,
  IDefaultState
} from "@misk/common"
import axios, { AxiosRequestConfig } from "axios"
import { fromJS } from "immutable"
import createCachedSelector from "re-reselect"
import { all, AllEffect, call, put, takeEvery } from "redux-saga/effects"
import { createSelector, OutputSelector, ParametricSelector } from "reselect"

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
export interface ISimpleNetworkPayload {
  error: any
  loading: boolean
  requestConfig: AxiosRequestConfig
  success: boolean
  tag: string
  url: string
}

export interface IDispatchSimpleNetwork {
  simpleNetworkDelete: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<SIMPLENETWORK.DELETE, ISimpleNetworkPayload>
  simpleNetworkFailure: (
    error: any
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
    data: any
  ) => IAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkPayload>
}

interface IDispatchDefault {
  data: any
  requestConfig: AxiosRequestConfig
  tag: string
}

const dispatchDefault: IDispatchDefault = {
  data: {},
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
        error: null,
        loading: true,
        requestConfig,
        success: false,
        tag,
        url
      }
    ),
  simpleNetworkFailure: (error: any) =>
    createAction<SIMPLENETWORK.FAILURE, ISimpleNetworkPayload>(
      SIMPLENETWORK.FAILURE,
      {
        ...error,
        loading: false,
        success: false
      }
    ),
  simpleNetworkGet: (
    tag: string = dispatchDefault.tag,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.GET, ISimpleNetworkPayload>(SIMPLENETWORK.GET, {
      error: null,
      loading: true,
      requestConfig,
      success: false,
      tag,
      url
    }),
  simpleNetworkHead: (
    tag: string = dispatchDefault.tag,
    url: string,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.HEAD, ISimpleNetworkPayload>(
      SIMPLENETWORK.HEAD,
      {
        error: null,
        loading: true,
        requestConfig,
        success: false,
        tag,
        url
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
        ...data,
        error: null,
        loading: true,
        requestConfig,
        success: false,
        tag,
        url
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
        ...data,
        error: null,
        loading: true,
        requestConfig,
        success: false,
        tag,
        url
      }
    ),
  simpleNetworkPut: (
    tag: string = dispatchDefault.tag,
    url: string,
    data: any = dispatchDefault.data,
    requestConfig: AxiosRequestConfig = dispatchDefault.requestConfig
  ) =>
    createAction<SIMPLENETWORK.PUT, ISimpleNetworkPayload>(SIMPLENETWORK.PUT, {
      ...data,
      error: null,
      loading: true,
      requestConfig,
      success: false,
      tag,
      url
    }),
  simpleNetworkSuccess: (data: any) =>
    createAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkPayload>(
      SIMPLENETWORK.SUCCESS,
      {
        ...data,
        error: null,
        loading: false,
        success: true
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
  action: IAction<
    SIMPLENETWORK,
    { tag: string; url: string; requestConfig: AxiosRequestConfig }
  >
) {
  try {
    const { tag, url, requestConfig } = action.payload
    const { data } = yield call(
      ActionTypeToAxiosCall[action.type],
      url,
      requestConfig
    )
    yield put(
      dispatchSimpleNetwork.simpleNetworkSuccess({
        tags: { [tag]: { data: { ...data } } }
      })
    )
  } catch (e) {
    const { tag } = action.payload
    yield put(
      dispatchSimpleNetwork.simpleNetworkFailure({
        tags: { [tag]: { error: { ...e } } }
      })
    )
  }
}

function* handlePatch(
  action: IAction<
    SIMPLENETWORK,
    {
      tag: string
      url: string
      updateData: any
      requestConfig: AxiosRequestConfig
    }
  >
) {
  try {
    const { tag, url, updateData, requestConfig } = action.payload
    const { data } = yield call(axios.patch, url, { updateData }, requestConfig)
    yield put(
      dispatchSimpleNetwork.simpleNetworkSuccess({
        tags: { [tag]: { data: { ...data } } }
      })
    )
  } catch (e) {
    const { tag } = action.payload
    yield put(
      dispatchSimpleNetwork.simpleNetworkFailure({
        tags: { [tag]: { error: { ...e } } }
      })
    )
  }
}

function* handlePost(
  action: IAction<
    SIMPLENETWORK,
    {
      tag: string
      url: string
      saveData: any
      requestConfig: AxiosRequestConfig
    }
  >
) {
  try {
    const { tag, url, saveData, requestConfig } = action.payload
    const { data } = yield call(axios.post, url, { saveData }, requestConfig)
    yield put(
      dispatchSimpleNetwork.simpleNetworkSuccess({
        tags: { [tag]: { data: { ...data } } }
      })
    )
  } catch (e) {
    const { tag } = action.payload
    yield put(
      dispatchSimpleNetwork.simpleNetworkFailure({
        tags: { [tag]: { error: { ...e } } }
      })
    )
  }
}

function* handlePut(
  action: IAction<
    SIMPLENETWORK,
    {
      tag: string
      url: string
      updateData: any
      requestConfig: AxiosRequestConfig
    }
  >
) {
  try {
    const { tag, url, updateData, requestConfig } = action.payload
    const { data } = yield call(axios.put, url, { updateData }, requestConfig)
    yield put(
      dispatchSimpleNetwork.simpleNetworkSuccess({
        tags: { [tag]: { data: { ...data } } }
      })
    )
  } catch (e) {
    const { tag } = action.payload
    yield put(
      dispatchSimpleNetwork.simpleNetworkFailure({
        tags: { [tag]: { error: { ...e } } }
      })
    )
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
const initialState = fromJS({
  tags: {},
  ...defaultState.toJS()
})

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
      return state.mergeDeep(action.payload)
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
export interface ISimpleNetworkTagResponse {
  data: any | null
  error: any | null
}

export interface ISimpleNetworkState extends IDefaultState {
  tags: {
    [tag: string]: ISimpleNetworkTagResponse
  }
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

export const simpleNetworkResponse: ParametricSelector<
  {},
  string,
  ISimpleNetworkTagResponse
> = createCachedSelector(
  simpleNetworkState,
  (simpleNetwork: ISimpleNetworkState, tag: string) =>
    simpleNetwork.tags[tag]
      ? simpleNetwork.tags[tag]
      : { data: null, error: null },
  (state: ISimpleNetworkState, tagResponse: ISimpleNetworkTagResponse) =>
    tagResponse
)((state, tag) => tag)
