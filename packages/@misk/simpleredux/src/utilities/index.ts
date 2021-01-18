import { History, Location } from "history"
import { HTTPMethod } from "http-method-enum"
import { fromJS, List } from "immutable"
import { match } from "react-router"
import { ForkEffectDescriptor, SimpleEffect } from "redux-saga/effects"
import { StatusCode } from "status-code-enum"
import { IDispatchSimpleRedux } from "../dispatch"

export * from "./handler"
export * from "./mergeSaga"
export * from "./simpleSelector"

/**
 * redux-sagas types copied manually in since they are not yet exported
 * @todo remove once https://github.com/redux-saga/redux-saga/pull/1890 is merged
 */
export interface CombinatorEffect<T, E> {
  "@@redux-saga/IO": true
  combinator: true
  type: T
  payload: CombinatorEffectDescriptor<E>
}
export type CombinatorEffectDescriptor<E> = { [key: string]: E } | E[]

/** Type definition for SimpleRedux root Saga: [watchSimpleReduxSagas] */
export type SimpleReduxSaga = IterableIterator<
  CombinatorEffect<"ALL", SimpleEffect<"FORK", ForkEffectDescriptor<any>>>
>

/**
 * Default React Router Props
 * These are injected in different conditions depending on if a component is
 * rendered as part of a React Router route
 * https://reacttraining.com/react-router/web/api/location
 */
export interface IRouterProvidedProps {
  history?: History
  location?: Location
  match?: match
}

/** Default State with Redux flow metadata */
export interface IDefaultState {
  data: any
  error: any
  loading: boolean
  success: boolean
}

/** simpleTag key included in SimpleRedux state to identify that it is compatible with @misk/simpleredux */
export interface IRootState {
  simpleTag: string
}

/** Default root state that includes Redux flow metadata and simpleTag */
export interface IDefaultRootState extends IDefaultState, IRootState {}

/** Initializes new default state with initial Redux metadata in an ImmutableJS object */
export const defaultState = fromJS({
  data: List([]),
  error: null,
  loading: false,
  success: false,
})

/**
 * @param simpleTag string identifier for the state domain
 * Used to initialize a top level domain of Redux state
 *
 * Example
 * - Domain: simpleForm
 * - Access: this.state.simpleForm
 * - simpleTag: "simpleForm"
 * - Initialize: defaultRootState("simpleForm")
 */
export const defaultRootState = (simpleTag: string) =>
  fromJS({
    simpleTag,
    ...defaultState.toJS(),
  })

/** Interface for read only Redux Action */
export interface IAction<T, P> {
  readonly type: T
  readonly payload?: P
}

/** Creates Redux Action enforcing type [T] for Action type, and [P] for Action Payload type */
export function createAction<T extends string, P>(
  type: T,
  payload: P
): IAction<T, P> {
  return { type, payload }
}

/** Generates message given a potentially null error object */
export const errorMessage = (error: any) => {
  if (!error) {
    return ""
  }

  let code = error.errorCode
  if (!code) {
    code =
      error.response &&
      error.response.status === StatusCode.ClientErrorUnauthorized
        ? "Unauthorized"
        : "InternalServerError"
  }

  return code
}

/**
 * Utilities
 */

/**
 * @param oldState input from the event.target.value of a button (string) or the oldState from Redux store (boolean)
 */
export const booleanToggle = (oldState: string | boolean) => {
  if (oldState === true || oldState === "on") {
    return false
  } else {
    return true
  }
}

/**
 * @param payload `action.payload` from Redux
 * Assumes that the first non-order safe key accessed is the data
 * Only use when action.payload has a single key (ie. the tag with all metadata inside)
 * Otherwise, unpredictable key selection
 */
export const getFirstTag = <
  T = { [key: string]: any },
  UNIONED_TYPE = { [key: string]: any | T }
>(payload: {
  [key: string]: UNIONED_TYPE
}): T => {
  if (Object.keys(payload).length === 1) {
    return (payload[Object.keys(payload)[0]] as unknown) as T
  }
  throw new Error(
    "@misk/simpleredux:getFirstTag unpredictable use with an object that has more than one key"
  )
}

/**
 * @param json possibly JSON input as a string
 * @returns JSON or string if JSON.parse fails
 */
export const jsonOrString = (json: string) => {
  try {
    return JSON.parse(json)
  } catch (e) {
    return json
  }
}

/** Lookup of HTTP Dispatch method */
export const HTTPMethodDispatch: any = (props: IDispatchSimpleRedux) => ({
  [HTTPMethod.CONNECT]: props.simpleHttpGet,
  [HTTPMethod.DELETE]: props.simpleHttpDelete,
  [HTTPMethod.GET]: props.simpleHttpGet,
  [HTTPMethod.HEAD]: props.simpleHttpHead,
  [HTTPMethod.OPTIONS]: props.simpleHttpGet,
  [HTTPMethod.PATCH]: props.simpleHttpPatch,
  [HTTPMethod.POST]: props.simpleHttpPost,
  [HTTPMethod.PUT]: props.simpleHttpPut,
  [HTTPMethod.TRACE]: props.simpleHttpGet,
})
