import {
  connectRouter,
  LocationChangeAction,
  RouterState
} from "connected-react-router"
import { History } from "history"
import { combineReducers, Reducer } from "redux"
import { all, fork } from "redux-saga/effects"
import {
  default as PaletteReducer,
  IPalleteState,
  watchExampleSagas
} from "./palette"
export * from "./palette"

/**
 * Redux Store State
 */
export interface IState {
  palette: IPalleteState
  router: Reducer<RouterState, LocationChangeAction>
}

/**
 * Reducers
 */
export const rootReducer = (history: History) =>
  combineReducers({
    palette: PaletteReducer,
    router: connectRouter(history)
  })

/**
 * Sagas
 */
export function* rootSaga() {
  yield all([fork(watchExampleSagas)])
}
