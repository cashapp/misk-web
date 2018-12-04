import {
  createAction,
  defaultState,
  IAction,
  IDefaultState
} from "@misk/common"
import axios from "axios"
import { fromJS } from "immutable"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { createSelector } from "reselect"
import { IState } from "../ducks"

/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export enum PALETTE {
  DINOSAUR = "PALETTE_DINOSAUR",
  SUCCESS = "PALETTE_SUCCESS",
  FAILURE = "PALETTE_FAILURE"
}

/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export const dispatchPalette = {
  dinosaur: () =>
    createAction(PALETTE.DINOSAUR, {
      error: null,
      loading: true,
      success: false
    }),
  failure: (error: any) =>
    createAction(PALETTE.FAILURE, { ...error, loading: false, success: false }),
  success: (data: any) =>
    createAction(PALETTE.SUCCESS, {
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
function* handleDinosaur() {
  try {
    const { data } = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/posts/"
    )
    yield put(dispatchPalette.success({ data }))
  } catch (e) {
    yield put(dispatchPalette.failure({ error: { ...e } }))
  }
}

export function* watchPaletteSagas() {
  yield all([takeLatest(PALETTE.DINOSAUR, handleDinosaur)])
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
export default function PaletteReducer(
  state = initialState,
  action: IAction<string, {}>
) {
  switch (action.type) {
    case PALETTE.DINOSAUR:
    case PALETTE.FAILURE:
    case PALETTE.SUCCESS:
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
export interface IPalleteState extends IDefaultState {
  [key: string]: any
}

/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
export const paletteState = (state: IState) => state.palette.toJS()

export const paletteSelector = createSelector(
  paletteState,
  state => state
)
