import {
  dispatchSimpleForm,
  dispatchSimpleNetwork,
  IDispatchSimpleForm,
  IDispatchSimpleNetwork,
  IRouterProvidedProps,
  ISimpleFormImmutableState,
  ISimpleFormState,
  ISimpleNetworkImmutableState,
  ISimpleNetworkState,
  SimpleFormReducer,
  SimpleNetworkReducer,
  SimpleReduxSaga,
  simpleRootSelector,
  watchSimpleFormSagas,
  watchSimpleNetworkSagas
} from "@misk/simpleredux"
import { combineReducers, Reducer } from "redux"
import { all, fork } from "redux-saga/effects"
import { RouterState } from "redux-first-history"
import {
  dispatchPalette,
  IDispatchPalette,
  IPaletteImmutableState,
  IPaletteState,
  PaletteReducer,
  watchPaletteSagas
} from "./palette"
export * from "./palette"

/**
 * Redux Store State
 */
export interface IState {
  palette: IPaletteState
  router: Reducer<RouterState>
  simpleForm: ISimpleFormState
  simpleNetwork: ISimpleNetworkState
}

/**
 * Dispatcher
 */
export interface IDispatchProps
  extends IDispatchPalette,
    IDispatchSimpleForm,
    IDispatchSimpleNetwork,
    IRouterProvidedProps {}

export const rootDispatcher: IDispatchProps = {
  ...dispatchSimpleForm,
  ...dispatchSimpleNetwork,
  ...dispatchPalette
}

/**
 * State Selectors
 */
export const rootSelectors = (state: IState) => ({
  palette: simpleRootSelector<IState, IPaletteImmutableState>("palette", state),
  router: state.router,
  simpleForm: simpleRootSelector<IState, ISimpleFormImmutableState>(
    "simpleForm",
    state
  ),
  simpleNetwork: simpleRootSelector<IState, ISimpleNetworkImmutableState>(
    "simpleNetwork",
    state
  )
})

/**
 * Reducers
 */
export const rootReducer = (routerReducer: Reducer<RouterState>): Reducer =>
  combineReducers({
    palette: PaletteReducer,
    router: routerReducer,
    simpleForm: SimpleFormReducer,
    simpleNetwork: SimpleNetworkReducer
  })

/**
 * Sagas
 */
export function* rootSaga(): SimpleReduxSaga {
  yield all([
    fork(watchPaletteSagas),
    fork(watchSimpleFormSagas),
    fork(watchSimpleNetworkSagas)
  ])
}

/**
 * Map Dispatch/State to Props
 */
export const mapStateToProps = (state: IState) => rootSelectors(state)

export const mapDispatchToProps: IDispatchProps = {
  ...rootDispatcher
}
