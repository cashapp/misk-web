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
import {
  connectRouter,
  LocationChangeAction,
  RouterState
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
  watchPaletteExemplarSagas
} from "./paletteExemplar"
export * from "./paletteExemplar"

/**
 * Redux Store State
 */
export interface IState {
  paletteExemplar: IPaletteExemplarState
  router: Reducer<RouterState, LocationChangeAction>
  simpleForm: ISimpleFormState
  simpleNetwork: ISimpleNetworkState
}

/**
 * Dispatcher
 */
export interface IDispatchProps
  extends IDispatchPaletteExemplar,
  IDispatchSimpleForm,
  IDispatchSimpleNetwork,
  IRouterProvidedProps { }

export const rootDispatcher: IDispatchProps = {
  ...dispatchSimpleForm,
  ...dispatchSimpleNetwork,
  ...dispatchPaletteExemplar
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
export const rootReducer = (history: History): Reducer<any, AnyAction> =>
  combineReducers({
    paletteExemplar: PaletteExemplarReducer,
    router: connectRouter(history),
    simpleForm: SimpleFormReducer,
    simpleNetwork: SimpleNetworkReducer
  })

/**
 * Sagas
 */
export function* rootSaga(): SimpleReduxSaga {
  yield all([
    fork(watchPaletteExemplarSagas),
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
