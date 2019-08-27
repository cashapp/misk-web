import axios, { AxiosResponse } from "axios"
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { SIMPLEREDUX } from "./action"
import {
  IAction,
  getFirstTag,
  jsonOrString,
  SimpleReduxSaga,
  booleanToggle
} from "./utilities"
import {
  dispatchSimpleRedux,
  ISimpleReduxPayload,
  ISimpleReduxPayloadTag,
  ISimpleCachePayloadTag,
  ISimpleHttpPayloadTag
} from "./dispatch"

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

/**
 * SimpleRedux
 */
const ActionTypeToAxiosCall: { [key: string]: any } = {
  [SIMPLEREDUX.HTTP_DELETE]: axios.delete,
  [SIMPLEREDUX.HTTP_GET]: axios.get,
  [SIMPLEREDUX.HTTP_HEAD]: axios.head,
  [SIMPLEREDUX.HTTP_PATCH]: axios.patch,
  [SIMPLEREDUX.HTTP_POST]: axios.post,
  [SIMPLEREDUX.HTTP_PUT]: axios.put
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
function* handleBasicNetworkRequest(
  action: IAction<SIMPLEREDUX, ISimpleReduxPayload>
) {
  try {
    const { tag, url, requestConfig } = getFirstTag<ISimpleHttpPayloadTag>(
      action.payload
    )
    const response: AxiosResponse = yield call(
      ActionTypeToAxiosCall[action.type],
      url,
      requestConfig
    )
    const data = responseAndData(response)
    yield put(dispatchSimpleRedux.simpleSuccess(tag, { url, data }))
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleHttpPayloadTag>(action.payload)
    const error = responseAndError(e)
    yield put(dispatchSimpleRedux.simpleFailure(tag, { url, error }))
  }
}

function* handlePatch(action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) {
  try {
    const updateData = jsonOrString(
      getFirstTag<ISimpleReduxPayloadTag>(action.payload).data
    )
    const { tag, url, requestConfig } = getFirstTag<ISimpleHttpPayloadTag>(
      action.payload
    )
    const response = yield call(axios.patch, url, updateData, requestConfig)
    const data = responseAndData(response)
    yield put(dispatchSimpleRedux.simpleSuccess(tag, { url, data }))
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleHttpPayloadTag>(action.payload)
    const error = responseAndError(e)
    yield put(dispatchSimpleRedux.simpleFailure(tag, { url, error }))
  }
}

function* handlePost(action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) {
  try {
    const saveData = jsonOrString(
      getFirstTag<ISimpleReduxPayloadTag>(action.payload).data
    )
    const { tag, url, requestConfig } = getFirstTag<ISimpleHttpPayloadTag>(
      action.payload
    )
    const response = yield call(axios.post, url, saveData, requestConfig)
    const data = responseAndData(response)
    yield put(dispatchSimpleRedux.simpleSuccess(tag, { url, data }))
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleHttpPayloadTag>(action.payload)
    const error = responseAndError(e)
    yield put(dispatchSimpleRedux.simpleFailure(tag, { url, error }))
  }
}

function* handlePut(action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) {
  try {
    const updateData = jsonOrString(
      getFirstTag<ISimpleReduxPayloadTag>(action.payload).data
    )
    const { tag, url, requestConfig } = getFirstTag<ISimpleHttpPayloadTag>(
      action.payload
    )
    const response = yield call(axios.put, url, updateData, requestConfig)
    const data = responseAndData(response)
    yield put(dispatchSimpleRedux.simpleSuccess(tag, { url, data }))
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleHttpPayloadTag>(action.payload)
    const error = responseAndError(e)
    yield put(dispatchSimpleRedux.simpleFailure(tag, { url, error }))
  }
}

function* handleBasicFormRequest(
  action: IAction<SIMPLEREDUX, ISimpleReduxPayload>
) {
  try {
    const { data, tag } = getFirstTag<ISimpleCachePayloadTag>(action.payload)
    yield put(
      dispatchSimpleRedux.simpleSuccess(tag, {
        ...getFirstTag<ISimpleCachePayloadTag>(action.payload),
        data
      })
    )
  } catch (e) {
    const { tag } = getFirstTag<ISimpleCachePayloadTag>(action.payload)
    yield put(
      dispatchSimpleRedux.simpleFailure(tag, {
        ...getFirstTag<ISimpleCachePayloadTag>(action.payload),
        ...e
      })
    )
  }
}

function* handleToggle(action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) {
  try {
    const { oldToggle, tag } = getFirstTag<ISimpleCachePayloadTag>(
      action.payload
    )
    yield put(
      dispatchSimpleRedux.simpleSuccess(tag, {
        ...getFirstTag<ISimpleCachePayloadTag>(action.payload),
        data: booleanToggle(oldToggle)
      })
    )
  } catch (e) {
    const { tag } = getFirstTag<ISimpleCachePayloadTag>(action.payload)
    yield put(
      dispatchSimpleRedux.simpleFailure(tag, {
        ...getFirstTag<ISimpleCachePayloadTag>(action.payload),
        ...e
      })
    )
  }
}

export function* watchSimpleReduxSagas(): SimpleReduxSaga {
  yield all([
    takeEvery(SIMPLEREDUX.HTTP_DELETE, handleBasicNetworkRequest),
    takeEvery(SIMPLEREDUX.HTTP_GET, handleBasicNetworkRequest),
    takeEvery(SIMPLEREDUX.HTTP_HEAD, handleBasicNetworkRequest),
    takeEvery(SIMPLEREDUX.HTTP_PATCH, handlePatch),
    takeEvery(SIMPLEREDUX.HTTP_POST, handlePost),
    takeEvery(SIMPLEREDUX.HTTP_PUT, handlePut),
    takeLatest(SIMPLEREDUX.CACHE, handleBasicFormRequest),
    takeLatest(SIMPLEREDUX.CACHE_NUMBER, handleBasicFormRequest),
    takeLatest(SIMPLEREDUX.CACHE_TOGGLE, handleToggle)
  ])
}

/**
 * DEPRECATED
 */
export const watchSimpleFormSagas = watchSimpleReduxSagas
export const watchSimpleNetworkSagas = watchSimpleReduxSagas
