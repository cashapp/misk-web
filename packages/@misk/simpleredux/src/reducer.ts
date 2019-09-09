import { defaultRootState, IAction, IRootState } from "./utilities"
import { SIMPLEREDUX } from "./action"
import { ISimpleReduxPayload } from "./dispatch"

/**
 * SimpleRedux
 */
const simpleTag = "simpleRedux"

/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialState = defaultRootState(simpleTag)

/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export function SimpleReduxReducer(
  state = initialState,
  action: IAction<SIMPLEREDUX, {}>
) {
  switch (action.type) {
    // Lifecycle
    case SIMPLEREDUX.FAILURE:
    case SIMPLEREDUX.MERGE:
    // Async HTTP Network Calls
    case SIMPLEREDUX.HTTP_DELETE:
    case SIMPLEREDUX.HTTP_GET:
    case SIMPLEREDUX.HTTP_HEAD:
    case SIMPLEREDUX.HTTP_PATCH:
    case SIMPLEREDUX.HTTP_POST:
    case SIMPLEREDUX.HTTP_PUT:
      return state.merge(action.payload)
    default:
      return state
  }
}

/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface ISimpleReduxState extends IRootState {
  [tag: string]: any | ISimpleReduxPayload
}
export interface ISimpleReduxImmutableState {
  toJS: () => ISimpleReduxState
}

/**
 * DEPRECATED SimpleNetwork
 */
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export const SimpleNetworkReducer = SimpleReduxReducer

/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface ISimpleNetworkState extends IRootState {
  [tag: string]: any | ISimpleReduxPayload
}
export interface ISimpleNetworkImmutableState {
  toJS: () => ISimpleNetworkState
}

/**
 * DEPRECATED SimpleForm
 */
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export const SimpleFormReducer = SimpleReduxReducer

/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface ISimpleFormState extends IRootState {
  [tag: string]: any | ISimpleReduxPayload
}
export interface ISimpleFormImmutableState {
  toJS: () => ISimpleFormState
}
