import axios, { AxiosResponse } from "axios"
import { all, call, put, takeEvery } from "redux-saga/effects"
import { SIMPLEREDUX } from "./action"
import {
  IAction,
  getFirstTag,
  jsonOrString,
  SimpleReduxSaga
} from "./utilities"
import {
  dispatchSimpleRedux,
  ISimpleReduxPayload,
  ISimpleReduxPayloadTag,
  ISimpleHttpPayloadTag,
  privateDispatchSimpleRedux
} from "./dispatch"

/** Map to lookup HTTP library function to handle the network related SimpleRedux action */
const ActionTypeToHttpCall: { [key: string]: any } = {
  [SIMPLEREDUX.HTTP_DELETE]: axios.delete,
  [SIMPLEREDUX.HTTP_GET]: axios.get,
  [SIMPLEREDUX.HTTP_HEAD]: axios.head,
  [SIMPLEREDUX.HTTP_PATCH]: axios.patch,
  [SIMPLEREDUX.HTTP_POST]: axios.post,
  [SIMPLEREDUX.HTTP_PUT]: axios.put
}

/** Include response and data in the new state */
const responseAndData = (response: AxiosResponse) => {
  const data =
    typeof response.data === "string" ? { data: response.data } : response.data
  return { ...response, ...data }
}

/** Include response and error in the new state */
const responseAndError = (error: { response: AxiosResponse }) => ({
  ...error,
  ...error.response
})

/**
 * Saga handler function for HTTP methods that don't include data in the request body
 * * DELETE
 * * GET
 * * HEAD
 */
function* handleHttpNoBody(action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) {
  try {
    const { tag, url, requestConfig } = getFirstTag<ISimpleHttpPayloadTag>(
      action.payload
    )
    const response: AxiosResponse = yield call(
      ActionTypeToHttpCall[action.type],
      url,
      requestConfig
    )
    const data = responseAndData(response)
    yield put(dispatchSimpleRedux.simpleMerge(tag, { url, data }))
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleHttpPayloadTag>(action.payload)
    const error = responseAndError(e)
    yield put(privateDispatchSimpleRedux.simpleFailure(tag, { url, error }))
  }
}

/** Saga handler function for HTTP Patch method */
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
    yield put(dispatchSimpleRedux.simpleMerge(tag, { url, data }))
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleHttpPayloadTag>(action.payload)
    const error = responseAndError(e)
    yield put(privateDispatchSimpleRedux.simpleFailure(tag, { url, error }))
  }
}

/** Saga handler function for HTTP Post method */
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
    yield put(dispatchSimpleRedux.simpleMerge(tag, { url, data }))
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleHttpPayloadTag>(action.payload)
    const error = responseAndError(e)
    yield put(privateDispatchSimpleRedux.simpleFailure(tag, { url, error }))
  }
}

/** Saga handler function for HTTP Put method */
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
    yield put(dispatchSimpleRedux.simpleMerge(tag, { url, data }))
  } catch (e) {
    const { tag, url } = getFirstTag<ISimpleHttpPayloadTag>(action.payload)
    const error = responseAndError(e)
    yield put(privateDispatchSimpleRedux.simpleFailure(tag, { url, error }))
  }
}

/** Root Saga for SimpleRedux */
export function* watchSimpleReduxSagas(): SimpleReduxSaga {
  yield all([
    takeEvery(SIMPLEREDUX.HTTP_DELETE, handleHttpNoBody),
    takeEvery(SIMPLEREDUX.HTTP_GET, handleHttpNoBody),
    takeEvery(SIMPLEREDUX.HTTP_HEAD, handleHttpNoBody),
    takeEvery(SIMPLEREDUX.HTTP_PATCH, handlePatch),
    takeEvery(SIMPLEREDUX.HTTP_POST, handlePost),
    takeEvery(SIMPLEREDUX.HTTP_PUT, handlePut)
  ])
}
