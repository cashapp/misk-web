import {
  SimpleReduxSaga,
  simpleRootSelector,
  ISimpleReduxState,
  dispatchSimpleRedux,
  IDispatchSimpleRedux,
  ISimpleReduxImmutableState,
  SimpleReduxReducer,
  watchSimpleReduxSagas
} from "@misk/simpleredux"
import { combineReducers, Reducer } from "redux"
import { all, fork } from "redux-saga/effects"

/**
 * Redux Store State
 */
export interface IState {
  simpleRedux: ISimpleReduxState
}

/**
 * Dispatcher
 */
export interface IDispatchProps extends IDispatchSimpleRedux {}

export const rootDispatcher: IDispatchProps = {
  ...dispatchSimpleRedux
}

/**
 * State Selectors
 */
export const rootSelectors = (state: IState) => ({
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
    simpleRedux: SimpleReduxReducer
  })

/**
 * Sagas
 */
export function* rootSaga(): SimpleReduxSaga {
  yield all([fork(watchSimpleReduxSagas)])
}

/**
 * Map Dispatch/State to Props
 */
export const mapStateToProps = (state: IState) => rootSelectors(state)

export const mapDispatchToProps: IDispatchProps = {
  ...rootDispatcher
}
