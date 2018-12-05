import {
  connectRouter,
  LocationChangeAction,
  RouterState
} from "connected-react-router"
import { History } from "history"
import { Reducer } from "redux"
import {
  dispatchSimpleNetwork,
  IDispatchSimpleNetwork,
  ISimpleNetworkState,
  SimpleNetworkReducer,
  simpleNetworkSelector,
  watchSimpleNetworkSagas
} from "../ducks"

/**
 * Redux Store State
 */
export interface IDefaultGlobalState {
  router: Reducer<RouterState, LocationChangeAction>
  simpleNetwork: ISimpleNetworkState
}

/**
 * Dispatcher
 */
export interface IDefaultDispatch extends IDispatchSimpleNetwork {}

export const defaultDispatcher: IDefaultDispatch = {
  ...dispatchSimpleNetwork
}

/**
 * State Selectors
 */
export const defaultSelectors = <T extends IDefaultGlobalState>(state: T) => ({
  simpleNetwork: simpleNetworkSelector(state)
})

/**
 * Reducers
 */
export const defaultReducers = (history: History) => ({
  router: connectRouter(history),
  simpleNetwork: SimpleNetworkReducer
})

/**
 * Sagas
 */
export const defaultSagas = [watchSimpleNetworkSagas()]
