import { SimpleReduxSaga } from "@misk/simpleredux"
import { combineReducers, Reducer } from "redux"
import { all, fork } from "redux-saga/effects"
import {
  default as LoaderReducer,
  ILoaderState,
  watchLoaderSagas
} from "./loader"
export * from "./loader"

/**
 * Redux Store State
 */
export interface IState {
  loader: ILoaderState
}

/**
 * Reducers
 */
export const rootReducer = (): Reducer<{
  loader: any
}> =>
  combineReducers({
    loader: LoaderReducer
  })

/**
 * Sagas
 */
export function* rootSaga(): SimpleReduxSaga {
  yield all([fork(watchLoaderSagas)])
}
