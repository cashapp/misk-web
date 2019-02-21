import {
  dispatchSimpleForm,
  dispatchSimpleNetwork,
  IDispatchSimpleForm,
  IDispatchSimpleNetwork,
  ISimpleFormState,
  ISimpleFormImmutableState,
  ISimpleNetworkState,
  ISimpleNetworkImmutableState,
  SimpleFormReducer,
  simpleRootSelector,
  SimpleNetworkReducer,
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
import { all, AllEffect, fork } from "redux-saga/effects"
import {
  dispatchPalette,
  PaletteReducer,
  IDispatchPalette,
  IPaletteState,
  IPaletteImmutableState,
  watchPaletteSagas
} from "./palette"
export * from "./palette"

/**
 * Redux Store State
 */
export interface IState {
  palette: IPaletteState
  router: Reducer<RouterState, LocationChangeAction>
  simpleForm: ISimpleFormState
  simpleNetwork: ISimpleNetworkState
}

/**
 * Dispatcher
 */
export interface IDispatchProps
  extends IDispatchSimpleForm,
    IDispatchSimpleNetwork,
    IDispatchPalette {}

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
    palette: PaletteReducer,
    router: connectRouter(history),
    simpleForm: SimpleFormReducer,
    simpleNetwork: SimpleNetworkReducer
  })

/**
 * Sagas
 */
export function* rootSaga(): IterableIterator<AllEffect> {
  yield all([
    fork(watchPaletteSagas),
    fork(watchSimpleFormSagas),
    fork(watchSimpleNetworkSagas)
  ])
}
