import axios, { AxiosResponse } from "axios"
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { SIMPLEFORM, SIMPLENETWORK } from "./action"
import {
  IAction,
  getFirstTag,
  jsonOrString,
  SimpleReduxSaga,
  booleanToggle
} from "./utilities"
import {
  ISimpleNetworkPayloadTag,
  dispatchSimpleNetwork,
  ISimpleFormPayload,
  ISimpleNetworkPayload,
  dispatchSimpleForm,
  ISimpleFormPayloadTag
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
 * SimpleNetwork
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
function* handleBasicNetworkRequest(
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
    takeEvery(SIMPLENETWORK.DELETE, handleBasicNetworkRequest),
    takeEvery(SIMPLENETWORK.GET, handleBasicNetworkRequest),
    takeEvery(SIMPLENETWORK.HEAD, handleBasicNetworkRequest),
    takeEvery(SIMPLENETWORK.PATCH, handlePatch),
    takeEvery(SIMPLENETWORK.POST, handlePost),
    takeEvery(SIMPLENETWORK.PUT, handlePut)
  ])
}

/**
 * SimpleForm
 */
function* handleBasicFormRequest(
  action: IAction<SIMPLEFORM, ISimpleFormPayload>
) {
  try {
    const { data, tag } = getFirstTag<ISimpleFormPayloadTag>(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormSuccess(tag, {
        ...getFirstTag<ISimpleFormPayloadTag>(action.payload),
        data
      })
    )
  } catch (e) {
    const { tag } = getFirstTag<ISimpleFormPayloadTag>(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormFailure(tag, {
        ...getFirstTag<ISimpleFormPayloadTag>(action.payload),
        ...e
      })
    )
  }
}

function* handleToggle(action: IAction<SIMPLEFORM, ISimpleFormPayload>) {
  try {
    const { oldToggle, tag } = getFirstTag<ISimpleFormPayloadTag>(
      action.payload
    )
    yield put(
      dispatchSimpleForm.simpleFormSuccess(tag, {
        ...getFirstTag<ISimpleFormPayloadTag>(action.payload),
        data: booleanToggle(oldToggle)
      })
    )
  } catch (e) {
    const { tag } = getFirstTag<ISimpleFormPayloadTag>(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormFailure(tag, {
        ...getFirstTag<ISimpleFormPayloadTag>(action.payload),
        ...e
      })
    )
  }
}

export function* watchSimpleFormSagas(): SimpleReduxSaga {
  yield all([
    takeLatest(SIMPLEFORM.INPUT, handleBasicFormRequest),
    takeLatest(SIMPLEFORM.NUMBER, handleBasicFormRequest),
    takeLatest(SIMPLEFORM.TOGGLE, handleToggle)
  ])
}
