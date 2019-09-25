import {
  createAction,
  IAction,
  IRootState,
  defaultRootState,
  SimpleReduxSaga
} from "@misk/simpleredux"
import axios from "axios"
import { Map } from "immutable"
import { all, call, put, takeLatest } from "redux-saga/effects"

/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export enum STARTERBASIC {
  DINOSAUR = "STARTERBASIC_DINOSAUR",
  SUCCESS = "STARTERBASIC_SUCCESS",
  FAILURE = "STARTERBASIC_FAILURE"
}

/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export interface IStarterBasicPayload {
  data?: any
  error: any
  loading: boolean
  success: boolean
}

export interface IDispatchStarterBasic {
  starterBasicDinosaur: (
    data: any,
    fieldTag: string,
    formTag: string
  ) => IAction<STARTERBASIC.DINOSAUR, IStarterBasicPayload>
  starterBasicFailure: (
    error: any
  ) => IAction<STARTERBASIC.FAILURE, IStarterBasicPayload>
  starterBasicSuccess: (
    data: any
  ) => IAction<STARTERBASIC.SUCCESS, IStarterBasicPayload>
}

export const dispatchStarterBasic: IDispatchStarterBasic = {
  starterBasicDinosaur: () =>
    createAction<STARTERBASIC.DINOSAUR, IStarterBasicPayload>(
      STARTERBASIC.DINOSAUR,
      {
        error: null,
        loading: true,
        success: false
      }
    ),
  starterBasicFailure: (error: any) =>
    createAction<STARTERBASIC.FAILURE, IStarterBasicPayload>(
      STARTERBASIC.FAILURE,
      {
        ...error,
        loading: false,
        success: false
      }
    ),
  starterBasicSuccess: (data: any) =>
    createAction<STARTERBASIC.SUCCESS, IStarterBasicPayload>(
      STARTERBASIC.SUCCESS,
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
function* handleDinosaur(action: IAction<STARTERBASIC, IStarterBasicPayload>) {
  try {
    const { data } = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/posts/"
    )
    yield put(dispatchStarterBasic.starterBasicSuccess({ data }))
  } catch (e) {
    yield put(dispatchStarterBasic.starterBasicFailure({ error: { ...e } }))
  }
}

export function* watchStarterBasicSagas(): SimpleReduxSaga {
  yield all([takeLatest(STARTERBASIC.DINOSAUR, handleDinosaur)])
}

/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialState = defaultRootState("starterBasic")

/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export const StarterBasicReducer = (
  state = initialState,
  action: IAction<STARTERBASIC, {}>
) => {
  switch (action.type) {
    case STARTERBASIC.DINOSAUR:
    case STARTERBASIC.FAILURE:
    case STARTERBASIC.SUCCESS:
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
export interface IStarterBasicState extends IRootState {
  [key: string]: any
}

export interface IStarterBasicImmutableState extends Map<string, any> {
  toJS: () => IStarterBasicState
}
