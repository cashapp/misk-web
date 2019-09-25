import {
  IRouterProvidedProps,
  SimpleReduxSaga,
  simpleRootSelector,
  ISimpleReduxState,
  dispatchSimpleRedux,
  IDispatchSimpleRedux,
  ISimpleReduxImmutableState,
  SimpleReduxReducer,
  watchSimpleReduxSagas
} from "@misk/simpleredux"
import {
  connectRouter,
  LocationChangeAction,
  RouterState
} from "connected-react-router"
import { History } from "history"
import { AnyAction, combineReducers, Reducer } from "redux"
import { all, fork } from "redux-saga/effects"
import {
  dispatchStarterBasic,
  IDispatchStarterBasic,
  IStarterBasicImmutableState,
  IStarterBasicState,
  StarterBasicReducer,
  watchStarterBasicSagas
} from "./starterBasic"
export * from "./starterBasic"

/**
 * Redux Store State
 */
export interface IState {
  starterBasic: IStarterBasicState
  router: Reducer<RouterState, LocationChangeAction>
  simpleRedux: ISimpleReduxState
}

/**
 * Dispatcher
 */
export interface IDispatchProps
  extends IDispatchStarterBasic,
    IDispatchSimpleRedux,
    IRouterProvidedProps {}

export const rootDispatcher: IDispatchProps = {
  ...dispatchSimpleRedux,
  ...dispatchStarterBasic
}

/**
 * State Selectors
 */
export const rootSelectors = (state: IState) => ({
  starterBasic: simpleRootSelector<IState, IStarterBasicImmutableState>(
    "starterBasic",
    state
  ),
  router: state.router,
  simpleRedux: simpleRootSelector<IState, ISimpleReduxImmutableState>(
    "simpleRedux",
    state
  )
})

/**
 * Reducers
 */
export const rootReducer = (history: History): Reducer<any, AnyAction> =>
  combineReducers({
    starterBasic: StarterBasicReducer,
    router: connectRouter(history),
    simpleRedux: SimpleReduxReducer
  })

/**
 * Sagas
 */
export function* rootSaga(): SimpleReduxSaga {
  yield all([fork(watchStarterBasicSagas), fork(watchSimpleReduxSagas)])
}

/**
 * Map Dispatch/State to Props
 */
export const mapStateToProps = (state: IState) => rootSelectors(state)

export const mapDispatchToProps: IDispatchProps = {
  ...rootDispatcher
}
