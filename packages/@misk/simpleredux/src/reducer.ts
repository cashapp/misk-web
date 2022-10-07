import { SIMPLEREDUX } from "./action"
import { ISimpleReduxPayload } from "./dispatch"
import { defaultRootState, IAction, IRootState } from "./utilities"

/**
 * Key included in SimpleRedux state to identify that it is compatible with @misk/simpleredux
 */
const simpleTag = "simpleRedux"

/**
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialState = defaultRootState(simpleTag)

/**
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export function SimpleReduxReducer(
  state: any = initialState,
  /* eslint-disable @typescript-eslint/ban-types */
  action: IAction<SIMPLEREDUX, {}>
  /* eslint-enable @typescript-eslint/ban-types */
) {
  /* eslint-disable no-fallthrough */
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
  /* eslint-enable no-fallthrough */
}

/**
 * Interface for the SimpleRedux state that is stored in Redux wrapped in an ImmutableJS object
 */
export interface ISimpleReduxState extends IRootState {
  [tag: string]: any | ISimpleReduxPayload
}

/**
 * Interface for a SimpleRedux state wrapped in an ImmutableJS object, as it is in Redux
 */
export interface ISimpleReduxImmutableState {
  toJS: () => ISimpleReduxState
}
