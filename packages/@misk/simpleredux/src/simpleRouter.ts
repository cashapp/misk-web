import axios, { AxiosRequestConfig } from "axios"
import { fromJS } from "immutable"
import { all, AllEffect, call, put, takeEvery } from "redux-saga/effects"
import { createAction, defaultState, IAction, IDefaultState } from "./utilities"

/**
 *   TODO: ROUTER SAGA
 *
 * from: React-Redux-Saga-Advanced-Starter / src/exampleSagas
 * In case you need to use a selector
 * import also select from redux-saga/effects
 * and then simplie yield select(yourSelector())
 * In case you need to redirect to whatever route
 * import { push } from react-router-redux and then
 * yield put(push('/next-page'))
 *
 */

/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export enum ROUTER {
  DELETE = "SIMPLENETWORK_DELETE",
  FAILURE = "SIMPLENETWORK_FAILURE",
  GET = "SIMPLENETWORK_GET",
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
export interface IRouterPayload {
  error: any
  loading: boolean
  requestConfig: AxiosRequestConfig
  success: boolean
  tag: string
  url: string
}

export interface IDispatchRouterProps {
  delete: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<ROUTER.DELETE, IRouterPayload>
  failure: (error: any) => IAction<ROUTER.FAILURE, IRouterPayload>
  get: (
    tag: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ) => IAction<ROUTER.GET, IRouterPayload>
  patch: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<ROUTER.PATCH, IRouterPayload>
  post: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<ROUTER.POST, IRouterPayload>
  put: (
    tag: string,
    url: string,
    data: any,
    requestConfig?: AxiosRequestConfig
  ) => IAction<ROUTER.PUT, IRouterPayload>
  success: (data: any) => IAction<ROUTER.SUCCESS, IRouterPayload>
}

export const dispatchRouter: IDispatchRouterProps = {
  delete: (
    tag: string = "latest",
    url: string,
    requestConfig: AxiosRequestConfig = {}
  ) =>
    createAction<ROUTER.DELETE, IRouterPayload>(ROUTER.DELETE, {
      error: null,
      loading: true,
      requestConfig,
      success: false,
      tag,
      url
    }),
  failure: (error: any) =>
    createAction<ROUTER.FAILURE, IRouterPayload>(ROUTER.FAILURE, {
      ...error,
      loading: false,
      success: false
    }),
  get: (
    tag: string = "latest",
    url: string,
    requestConfig: AxiosRequestConfig = {}
  ) =>
    createAction<ROUTER.GET, IRouterPayload>(ROUTER.GET, {
      error: null,
      loading: true,
      requestConfig,
      success: false,
      tag,
      url
    }),
  patch: (
    tag: string = "latest",
    url: string,
    data: any = {},
    requestConfig: AxiosRequestConfig = {}
  ) =>
    createAction<ROUTER.PATCH, IRouterPayload>(ROUTER.PATCH, {
      ...data,
      error: null,
      loading: true,
      requestConfig,
      success: false,
      tag,
      url
    }),
  post: (
    tag: string = "latest",
    url: string,
    data: any = {},
    requestConfig: AxiosRequestConfig = {}
  ) =>
    createAction<ROUTER.POST, IRouterPayload>(ROUTER.POST, {
      ...data,
      error: null,
      loading: true,
      requestConfig,
      success: false,
      tag,
      url
    }),
  put: (
    tag: string = "latest",
    url: string,
    data: any = {},
    requestConfig: AxiosRequestConfig = {}
  ) =>
    createAction<ROUTER.PUT, IRouterPayload>(ROUTER.PUT, {
      ...data,
      error: null,
      loading: true,
      requestConfig,
      success: false,
      tag,
      url
    }),
  success: (data: any) =>
    createAction<ROUTER.SUCCESS, IRouterPayload>(ROUTER.SUCCESS, {
      ...data,
      error: null,
      loading: false,
      success: true
    })
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
function* handleDelete(
  action: IAction<
    ROUTER,
    { tag: string; url: string; requestConfig: AxiosRequestConfig }
  >
) {
  try {
    const { tag, url, requestConfig } = action.payload
    const { data } = yield call(axios.delete, url, requestConfig)
    yield put(dispatchRouter.success({ [tag]: data }))
  } catch (e) {
    const { tag } = action.payload
    yield put(dispatchRouter.failure({ [tag]: { error: { ...e } } }))
  }
}

function* handleGet(
  action: IAction<
    ROUTER,
    { tag: string; url: string; requestConfig: AxiosRequestConfig }
  >
) {
  try {
    const { tag, url, requestConfig } = action.payload
    const { data } = yield call(axios.get, url, requestConfig)
    yield put(dispatchRouter.success({ [tag]: data }))
  } catch (e) {
    const { tag } = action.payload
    yield put(dispatchRouter.failure({ [tag]: { error: { ...e } } }))
  }
}

function* handlePatch(
  action: IAction<
    ROUTER,
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
    yield put(dispatchRouter.success({ [tag]: data }))
  } catch (e) {
    const { tag } = action.payload
    yield put(dispatchRouter.failure({ [tag]: { error: { ...e } } }))
  }
}

function* handlePost(
  action: IAction<
    ROUTER,
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
    yield put(dispatchRouter.success({ [tag]: data }))
  } catch (e) {
    const { tag } = action.payload
    yield put(dispatchRouter.failure({ [tag]: { error: { ...e } } }))
  }
}

function* handlePut(
  action: IAction<
    ROUTER,
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
    yield put(dispatchRouter.success({ [tag]: data }))
  } catch (e) {
    const { tag } = action.payload
    yield put(dispatchRouter.failure({ [tag]: { error: { ...e } } }))
  }
}

export function* watchRouterSagas(): IterableIterator<AllEffect> {
  yield all([
    takeEvery(ROUTER.DELETE, handleDelete),
    takeEvery(ROUTER.GET, handleGet),
    takeEvery(ROUTER.PATCH, handlePatch),
    takeEvery(ROUTER.POST, handlePost),
    takeEvery(ROUTER.PUT, handlePut)
  ])
}

/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialState = fromJS({
  ...defaultState.toJS()
})

/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export function RouterReducer(
  state = initialState,
  action: IAction<ROUTER, {}>
) {
  switch (action.type) {
    case ROUTER.DELETE:
    case ROUTER.FAILURE:
    case ROUTER.GET:
    case ROUTER.PATCH:
    case ROUTER.POST:
    case ROUTER.PUT:
    case ROUTER.SUCCESS:
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
export interface IRouterState extends IDefaultState {
  tags: {
    [tag: string]: {
      data: any | null
      error: any | null
    }
  }
}

/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
// export const paletteState = (state: IState) => state.palette

// export const paletteSelector = () =>
//   createSelector(
//     paletteState,
//     state => state.toJS()
//   )
