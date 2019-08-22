import { defaultRootState, IAction, IRootState } from "./utilities"
import { SIMPLEFORM, SIMPLENETWORK } from "./action"
import { ISimpleFormPayload, ISimpleNetworkPayload } from "./dispatch"

/**
 * SimpleNetwork
 */
const simpleNetworkTag = "simpleNetwork"
/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialNetworkState = defaultRootState(simpleNetworkTag)

/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export function SimpleNetworkReducer(
  state = initialNetworkState,
  action: IAction<SIMPLENETWORK, {}>
) {
  switch (action.type) {
    case SIMPLENETWORK.DELETE:
    case SIMPLENETWORK.FAILURE:
    case SIMPLENETWORK.GET:
    case SIMPLENETWORK.HEAD:
    case SIMPLENETWORK.PATCH:
    case SIMPLENETWORK.POST:
    case SIMPLENETWORK.PUT:
    case SIMPLENETWORK.SUCCESS:
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

export interface ISimpleNetworkState extends IRootState {
  [tag: string]: any | ISimpleNetworkPayload
}

export interface ISimpleNetworkImmutableState {
  toJS: () => ISimpleNetworkState
}

/**
 * SimpleForm
 */

const simpleFormTag = "simpleForm"
/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialFormState = defaultRootState(simpleFormTag)

/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export function SimpleFormReducer(
  state = initialFormState,
  action: IAction<SIMPLEFORM, {}>
) {
  switch (action.type) {
    case SIMPLEFORM.FAILURE:
    case SIMPLEFORM.INPUT:
    case SIMPLEFORM.NUMBER:
    case SIMPLEFORM.SUCCESS:
    case SIMPLEFORM.TOGGLE:
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

export interface ISimpleFormState extends IRootState {
  [tag: string]: any | ISimpleFormPayload
}

export interface ISimpleFormImmutableState {
  toJS: () => ISimpleFormState
}
