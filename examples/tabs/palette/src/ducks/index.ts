import {
  defaultDispatcher,
  defaultReducers,
  defaultSagas,
  defaultSelectors,
  IDefaultDispatch,
  IDefaultGlobalState
} from "@misk/core"
export { dispatchSimpleNetwork } from "@misk/core"
import { History } from "history"
import { combineReducers } from "redux"
import { all, fork } from "redux-saga/effects"
import {
  default as PaletteReducer,
  IPalleteState,
  paletteSelector,
  watchPaletteSagas
} from "./palette"
export * from "./palette"

/**
 * Redux Store State
 */
export interface IState extends IDefaultGlobalState {
  palette: IPalleteState
}

/**
 * Dispatcher
 */
export interface IDispatchProps extends IDefaultDispatch {}

export const rootDispatcher: IDispatchProps = {
  ...defaultDispatcher
}

/**
 * State Selectors
 */
export const rootSelectors = (state: IState) => ({
  palette: paletteSelector(state),
  ...defaultSelectors(state)
})

/**
 * Reducers
 */
export const rootReducer = (history: History) =>
  combineReducers({
    palette: PaletteReducer,
    ...defaultReducers(history)
  })

/**
 * Sagas
 */
export function* rootSaga() {
  yield all([fork(watchPaletteSagas)].concat(defaultSagas))
}
