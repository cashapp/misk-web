import {
  IRouterProvidedProps,
  SimpleReduxSaga,
  simpleRootSelector,
  ISimpleReduxState,
  IDispatchSimpleRedux,
  dispatchSimpleRedux,
  ISimpleReduxImmutableState,
  SimpleReduxReducer,
  watchSimpleReduxSagas,
} from "@misk/simpleredux"
import {
  connectRouter,
  LocationChangeAction,
  RouterState,
} from "connected-react-router"
import { History } from "history"
import { AnyAction, combineReducers, Reducer } from "redux"
import { all, fork } from "redux-saga/effects"
import {
  dispatchPaletteExemplar,
  IDispatchPaletteExemplar,
  IPaletteExemplarImmutableState,
  IPaletteExemplarState,
  PaletteExemplarReducer,
  watchPaletteExemplarSagas,
} from "./paletteExemplar"
export * from "./paletteExemplar"

/**
 * Redux Store State
 */
export interface IState {
  paletteExemplar: IPaletteExemplarState
  router: Reducer<RouterState, LocationChangeAction>
  simpleRedux: ISimpleReduxState
}

/**
 * Dispatcher
 */
export interface IDispatchProps
  extends IDispatchPaletteExemplar,
    IDispatchSimpleRedux,
    IRouterProvidedProps {}

export const rootDispatcher: IDispatchProps = {
  ...dispatchSimpleRedux,
  ...dispatchPaletteExemplar,
}

/**
 * State Selectors
 */
export const rootSelectors = (state: IState) => ({
  paletteExemplar: simpleRootSelector<IState, IPaletteExemplarImmutableState>(
    "paletteExemplar",
    state
  ),
  router: state.router,
  simpleRedux: simpleRootSelector<IState, ISimpleReduxImmutableState>(
    "simpleRedux",
    state
  ),
})

/**
 * Reducers
 */
export const rootReducer = (history: History): Reducer<any, AnyAction> =>
  combineReducers({
    paletteExemplar: PaletteExemplarReducer,
    router: connectRouter(history),
    simpleRedux: SimpleReduxReducer,
  })

/**
 * Sagas
 */
export function* rootSaga(): SimpleReduxSaga {
  yield all([fork(watchPaletteExemplarSagas), fork(watchSimpleReduxSagas)])
}

/**
 * Map Dispatch/State to Props
 */
export const mapStateToProps = (state: IState) => rootSelectors(state)

export const mapDispatchToProps: IDispatchProps = {
  ...rootDispatcher,
}
