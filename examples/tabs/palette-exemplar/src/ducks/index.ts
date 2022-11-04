import {
  SimpleReduxSaga,
  simpleRootSelector,
  ISimpleReduxState,
  IDispatchSimpleRedux,
  dispatchSimpleRedux,
  ISimpleReduxImmutableState,
  SimpleReduxReducer,
  watchSimpleReduxSagas
} from "@misk/simpleredux"
import { combineReducers, Reducer } from "redux"
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
  simpleRedux: ISimpleReduxState
}

/**
 * Dispatcher
 */
export interface IDispatchProps
  extends IDispatchPaletteExemplar,
    IDispatchSimpleRedux {}

export const rootDispatcher: IDispatchProps = {
  ...dispatchSimpleRedux,
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
  simpleRedux: simpleRootSelector<IState, ISimpleReduxImmutableState>(
    "simpleRedux",
    state
  )
})

/**
 * Reducers
 */
export const rootReducer = (): Reducer =>
  combineReducers({
    paletteExemplar: PaletteExemplarReducer,
    simpleRedux: SimpleReduxReducer
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
  ...rootDispatcher
}
