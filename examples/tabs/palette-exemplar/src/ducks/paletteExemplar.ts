import {
  createAction,
  IAction,
  IRootState,
  defaultRootState,
  SimpleReduxSaga,
} from "@misk/simpleredux"
import axios from "axios"
import { Map } from "immutable"
import { all, call, put, takeLatest } from "redux-saga/effects"

/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export enum PALETTEEXEMPLAR {
  DINOSAUR = "PALETTEEXEMPLAR_DINOSAUR",
  SUCCESS = "PALETTEEXEMPLAR_SUCCESS",
  FAILURE = "PALETTEEXEMPLAR_FAILURE",
}

/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export interface IPaletteExemplarPayload {
  data?: any
  error: any
  loading: boolean
  success: boolean
}

export interface IDispatchPaletteExemplar {
  paletteExemplarDinosaur: (
    data: any,
    fieldTag: string,
    formTag: string
  ) => IAction<PALETTEEXEMPLAR.DINOSAUR, IPaletteExemplarPayload>
  paletteExemplarFailure: (
    error: any
  ) => IAction<PALETTEEXEMPLAR.FAILURE, IPaletteExemplarPayload>
  paletteExemplarSuccess: (
    data: any
  ) => IAction<PALETTEEXEMPLAR.SUCCESS, IPaletteExemplarPayload>
}

export const dispatchPaletteExemplar: IDispatchPaletteExemplar = {
  paletteExemplarDinosaur: () =>
    createAction<PALETTEEXEMPLAR.DINOSAUR, IPaletteExemplarPayload>(
      PALETTEEXEMPLAR.DINOSAUR,
      {
        error: null,
        loading: true,
        success: false,
      }
    ),
  paletteExemplarFailure: (error: any) =>
    createAction<PALETTEEXEMPLAR.FAILURE, IPaletteExemplarPayload>(
      PALETTEEXEMPLAR.FAILURE,
      {
        ...error,
        loading: false,
        success: false,
      }
    ),
  paletteExemplarSuccess: (data: any) =>
    createAction<PALETTEEXEMPLAR.SUCCESS, IPaletteExemplarPayload>(
      PALETTEEXEMPLAR.SUCCESS,
      {
        ...data,
        error: null,
        loading: false,
        success: true,
      }
    ),
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
function* handleDinosaur(
  action: IAction<PALETTEEXEMPLAR, IPaletteExemplarPayload>
) {
  try {
    const { data } = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/posts/"
    )
    yield put(dispatchPaletteExemplar.paletteExemplarSuccess({ data }))
  } catch (e) {
    yield put(
      dispatchPaletteExemplar.paletteExemplarFailure({ error: { ...e } })
    )
  }
}

export function* watchPaletteExemplarSagas(): SimpleReduxSaga {
  yield all([takeLatest(PALETTEEXEMPLAR.DINOSAUR, handleDinosaur)])
}

/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialState = defaultRootState("paletteExemplar")

/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export const PaletteExemplarReducer = (
  state = initialState,
  action: IAction<PALETTEEXEMPLAR, {}>
) => {
  switch (action.type) {
    case PALETTEEXEMPLAR.DINOSAUR:
    case PALETTEEXEMPLAR.FAILURE:
    case PALETTEEXEMPLAR.SUCCESS:
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
export interface IPaletteExemplarState extends IRootState {
  [key: string]: any
}

export interface IPaletteExemplarImmutableState extends Map<string, any> {
  toJS: () => IPaletteExemplarState
}
