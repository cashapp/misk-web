import {
  IDispatchSimpleNetworkProps,
  ISimpleNetworkState,
  SimpleNetworkReducer,
  watchSimpleNetworkSagas
} from "@misk/core"
export { dispatchSimpleNetwork } from "@misk/core"
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
  watchPaletteSagas
} from "./palette"
export * from "./palette"

/**
 * Redux Store State
 */
export interface IState {
  palette: IPalleteState
  router: Reducer<RouterState, LocationChangeAction>
  simpleNetwork: ISimpleNetworkState
}

export interface IDispatchPaletteDucksProps
  extends IDispatchSimpleNetworkProps {}

/**
 * Reducers
 */
export const rootReducer = (history: History) =>
  combineReducers({
    palette: PaletteReducer,
    router: connectRouter(history),
    simpleNetwork: SimpleNetworkReducer
  })

/**
 * Sagas
 */
export function* rootSaga() {
  yield all([fork(watchPaletteSagas), fork(watchSimpleNetworkSagas)])
}
