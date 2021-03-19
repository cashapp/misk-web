import { SimpleReduxSaga } from "@misk/simpleredux"
import {
  connectRouter,
  LocationChangeAction,
  RouterState,
} from "connected-react-router"
import { History } from "history"
import { AnyAction, combineReducers, Reducer } from "redux"
import { all, fork } from "redux-saga/effects"
import {
  default as LoaderReducer,
  ILoaderState,
  watchLoaderSagas,
} from "./loader"
export * from "./loader"

/**
 * Redux Store State
 */
export interface IState {
  loader: ILoaderState
  router: Reducer<RouterState, LocationChangeAction>
}

/**
 * Reducers
 */
export const rootReducer = (
  history: History
): Reducer<
  {
    loader: any
    router: RouterState
  },
  AnyAction
> =>
  combineReducers({
    loader: LoaderReducer,
    router: connectRouter(history),
  })

/**
 * Sagas
 */
export function* rootSaga(): SimpleReduxSaga {
  yield all([fork(watchLoaderSagas)])
}
