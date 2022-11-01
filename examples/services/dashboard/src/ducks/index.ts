import { SimpleReduxSaga } from "@misk/simpleredux"
import { combineReducers, Reducer } from "redux"
import { all, fork } from "redux-saga/effects"
import {
  default as LoaderReducer,
  ILoaderState,
  watchLoaderSagas
} from "./loader"
import { RouterState } from "redux-first-history"
export * from "./loader"

/**
 * Redux Store State
 */
export interface IState {
  loader: ILoaderState
  router: Reducer<RouterState>
}

/**
 * Reducers
 */
export const rootReducer = (
  routerReducer: Reducer<RouterState>
): Reducer<{
  loader: any
  router: RouterState
}> =>
  combineReducers({
    loader: LoaderReducer,
    router: routerReducer
  })

/**
 * Sagas
 */
export function* rootSaga(): SimpleReduxSaga {
  yield all([fork(watchLoaderSagas)])
}
