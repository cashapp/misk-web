import {
  defaultDispatcher,
  defaultReducers,
  defaultSagas,
  defaultSelectors,
  IDefaultDispatch,
  IDefaultGlobalState,
  watchSimpleNetworkSagas
} from "@misk/core"
export { dispatchSimpleNetwork } from "@misk/core"
import { History } from "history"
import { combineReducers } from "redux"
import { all, fork } from "redux-saga/effects"

/**
 * Redux Store State
 */
export interface IState extends IDefaultGlobalState {}

/**
 * Dispatcher
 */
export interface IDispatchProps extends IDefaultDispatch {}

console.log("dispa", defaultDispatcher)
export const rootDispatcher: IDispatchProps = {
  ...defaultDispatcher
}

/**
 * State Selectors
 */
export const rootSelectors = (state: IState) => ({
  ...defaultSelectors(state)
})

/**
 * Reducers
 */
export const rootReducer = (history: History) =>
  combineReducers({
    ...defaultReducers(history)
  })

/**
 * Sagas
 */
const ds = [watchSimpleNetworkSagas]
console.log(defaultSagas, ds)
export function* rootSaga() {
  yield all([].concat(ds.map(saga => fork(saga))))
}
