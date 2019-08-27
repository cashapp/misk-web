import { History, Location } from "history"
import { fromJS, List, Map } from "immutable"
import get from "lodash/get"
import pick from "lodash/pick"
import { match } from "react-router"
import { ForkEffectDescriptor, SimpleEffect } from "redux-saga/effects"
import createCachedSelector from "re-reselect"
import { createSelector, OutputSelector, ParametricSelector } from "reselect"
import { StatusCode } from "status-code-enum"

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

export type SimpleReduxSaga = IterableIterator<
  CombinatorEffect<"ALL", SimpleEffect<"FORK", ForkEffectDescriptor>>
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

/**
 * Default State with Redux flow metadata wrapped in an Immutable JS object for more efficient use in Reducers
 */
export interface IDefaultState {
  data: any
  error: any
  loading: boolean
  success: boolean
}

/**
 * RootState has added simpleTag for easier use in selectors
 */
export interface IRootState {
  simpleTag: string
}

export interface IDefaultRootState extends IDefaultState, IRootState {}

/**
 * Initializes new default state with initial Redux metadata state
 */
export const defaultState = fromJS({
  data: List([]),
  error: null,
  loading: false,
  success: false
})

/**
 *
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
    ...defaultState.toJS()
  })

/**
 * Create type safe Redux Actions
 */
export interface IAction<T, P> {
  readonly type: T
  readonly payload?: P
}

export function createAction<T extends string, P>(
  type: T,
  payload: P
): IAction<T, P> {
  return { type, payload }
}

/**
 *
 * @param error Generates message given a potentially null error object
 */
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
 * State Selectors
 * A memoized, efficient way to compute and return the latest domain of the state
 */
export const selectSubState: <
  IState extends { [key: string]: ISubState },
  ISubState extends { [key: string]: any }
>(
  domain: string
) => (state: IState) => ISubState = <
  IState extends { [key: string]: ISubState },
  ISubState extends { [key: string]: any }
>(
  domain: string
) => (state: IState) => {
  return state[domain]
}

export const selectRawSubState: <
  IState extends Map<string, any>,
  ISubState extends { [key: string]: any }
>(
  domain: string
) => (state: IState) => ISubState = <
  IState extends Map<string, any>,
  ISubState extends { [key: string]: any }
>(
  domain: string
) => (state: IState) => {
  return state.get(domain)
}

const rawSubStateSelector: <IState extends Map<string, any>, ISubState>(
  domain: string
) => OutputSelector<IState, any, (res: ISubState) => any> = <
  IState extends Map<string, any>,
  ISubState
>(
  domain: string
) =>
  createSelector(
    selectRawSubState<IState, ISubState>(domain),
    state => state
  )

const immutableSubStateSelector: <
  IState extends { [key: string]: ISubState & any },
  ISubState extends { toJS: () => IRootState }
>(
  domain: string
) => OutputSelector<IState, any, (res: ISubState) => any> = <
  IState extends { [key: string]: ISubState },
  ISubState extends { toJS: () => IRootState }
>(
  domain: string
) =>
  createSelector(
    selectSubState<IState, ISubState>(domain),
    state => state.toJS()
  )

/**
 * simpleRootRawSelector is a Redux selector of a subState based on a domain string
 * @param domain
 * @param state
 *
 * Returns the raw stored object from Redux (in contrast to simpleRootSelector)
 */
export const simpleRootRawSelector = <
  IState extends Map<string, any>,
  ISubState
>(
  domain: string,
  state: IState
) => rawSubStateSelector<IState, ISubState>(domain)(state)

/**
 * simpleRootSelector is a Redux selector of a subState based on a domain string
 * @param domain
 * @param state
 *
 * Asssumes that the substate is an ImmutableJS object and has a toJS function on the object
 */
export const simpleRootSelector = <
  IState extends { [key: string]: ISubState & any },
  ISubState extends { toJS: () => IRootState }
>(
  domain: string,
  state: IState
) => immutableSubStateSelector<IState, ISubState>(domain)(state)

/**
 * DEPRECATED
 */
export const enum simpleType {
  array,
  boolean,
  number,
  object,
  string,
  tags
}

/**
 * DEPRECATED
 */
const baseType = (returnType: simpleType = simpleType.string): any => {
  switch (returnType) {
    case simpleType.boolean:
      return false
    case simpleType.number:
      return 0
    case simpleType.string:
      return ""
    case simpleType.object:
      return {}
    case simpleType.tags:
      return []
  }
}

/**
 * DEPRECATED
 */
export const simpleSelect = <
  IState extends { [key: string]: ISubState | any },
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subState: any,
  tagFilter: string,
  tagKeysFilter: string = "",
  returnType?: any,
  subStateSelector?: string | any
) => {
  console.warn(
    "[DEPRECATED] @misk/simpleRedux::simpleSelect is deprecated and will be removed.\nUse `simpleSelectorGet(subState, path, defaultValue)` instead using the same API as Lodash::get: https://lodash.com/docs#get\n@Misk/SimpleRedux Migration: https://cashapp.github.io/misk-web/docs/guides/changelog"
  )
  let selector
  if (subStateSelector) {
    if (typeof subStateSelector === "string") {
      selector = selectSubState<IState, ISubState>(subStateSelector)
    } else if (typeof subStateSelector === "function") {
      selector = subStateSelector
    } else {
      throw new Error(
        "@misk/simpleRedux:simpleSelect Invalid subStateSelector argument. Must be string or selector function."
      )
    }
  } else if (subState.simpleTag) {
    selector = selectSubState<IState, ISubState>(subState.simpleTag)
  } else {
    throw new Error(
      "@misk/simpleRedux:simpleSelect No subStateSelector could be determined from subState.simpleTag or from subStateSelector argument. Check documentation for approved ways to call simpleSelect."
    )
  }
  // return simpleSelector(subState, [tagFilter, tagKeysFilter], baseType(returnType))
  const path = [tagFilter, tagKeysFilter].filter(e => e !== "")
  const defaultValue = baseType(returnType)
  return createSimpleSelectorGet<ISubState, ISubPayload>(
    selector,
    path,
    defaultValue
  )(subState, path)
}

/**
 * Cached Redux Selector using Lodash Get API to select parts of the state
 * https://lodash.com/docs#get
 */
export const simpleSelectorGet = <
  IState extends { [key: string]: ISubState | any },
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subState: any,
  path: string | string[],
  defaultValue?: any
) => {
  if (!subState.simpleTag) {
    throw new Error(
      "@misk/simpleRedux:simpleSelect called with state that doesn't have a \"simpleTag\" key. Make sure you're passing in a state that is part of @misk/simpleredux."
    )
  }
  return createSimpleSelectorGet<ISubState, ISubPayload>(
    selectSubState<IState, ISubState>(subState.simpleTag),
    path,
    defaultValue
  )(subState, path)
}

export const createSimpleSelectorGet: <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
  path: string | string[],
  defaultValue?: any
) => ParametricSelector<
  ISubState,
  string | string[],
  any | ISubPayload | ISubPayload[]
> = <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
  path: string | string[],
  defaultValue?: any
) =>
  createCachedSelector(
    // selector
    subStateSelector,
    // selection function to retrieve certain results from state
    (subState: ISubState, path: string | string[]) =>
      get(subState, path, defaultValue),
    // cache hit function
    (_: ISubState, matched: ISubPayload[]) => matched
  )(
    // fn to generate the cache key, in this case the joined path
    (_, path) =>
      (typeof path === "string" && path) || (path as string[]).join(".")
  )

/**
 * Cached Redux Selector using Lodash Pick API to select parts of the state
 * https://lodash.com/docs#pick
 */
export const simpleSelectorPick = <
  IState extends { [key: string]: ISubState | any },
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subState: any,
  paths: string | string[]
) => {
  if (!subState.simpleTag) {
    throw new Error(
      "@misk/simpleRedux:simpleSelect called with state that doesn't have a \"simpleTag\" key. Make sure you're passing in a state that is part of @misk/simpleredux."
    )
  }
  return createSimpleSelectorPick<ISubState, ISubPayload>(
    selectSubState<IState, ISubState>(subState.simpleTag),
    paths
  )(subState, paths)
}

export const createSimpleSelectorPick: <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
  paths: string | string[]
) => ParametricSelector<
  ISubState,
  string | String[],
  any | ISubPayload | ISubPayload[]
> = <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
  paths: string | string[]
) =>
  createCachedSelector(
    // selector
    subStateSelector,
    // selection function to retrieve certain results from state
    (subState: ISubState, paths: string | string[]) => pick(subState, paths),
    // cache hit function
    (_, matched: ISubPayload) => matched
  )(
    // fn to generate the cache key, in this case the joined path
    (_, paths) =>
      (typeof paths === "string" && paths) || (paths as string[]).join(".")
  )

/**
 * Handler Functions
 * Reduce the legwork of parsing `onChange`, `onClick` and other events in Buttons, Inputs, Toggles...etc to call your handling function
 *
 * Old Way: Manually declare inline arrow funtions consuming the input events
 * ```
 * <InputGroup onChange={(event: any) => (props.simpleFormInput("FormInputTag", event.target.value))}
 * <NumberInput onChange={({valueAsNumber: number, valueAsString: string}) => (props.simpleFormNumber("FormNumberTag", valueAsNumber, valueAsString))}
 * ```
 *
 * New way: Use on*FnCall to wrap and implicitly pass into handling functions the input events
 * ```
 * <InputGroup onChange={onChangeFnCall(props.simpleFormInput, ["FormInputTag"])}
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleFormNumber, ["FormNumberTag"])}
 * ```
 */

/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Button onClick={onClickFnCall(props.simpleNetworkPut, ["PutTag", { ...requestBody }])}
 * ```
 */
export const onClickFnCall = (callFn: any, ...args: any) => (event: any) => {
  callFn(...args)
}

/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <InputGroup onChange={onChangeFnCall(props.simpleFormInput, ["FormInputTag"])}
 * ```
 */
export const onChangeFnCall = (callFn: any, ...args: any) => (event: any) => {
  callFn(...args, event.target.value)
}

/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Checkbox onChange={onChangeToggleFnCall(props.simpleFormToggle, ["FormToggleTag", simpleFormState])}
 * ```
 */
export const onChangeToggleFnCall = (callFn: any, ...args: any) => (
  event: any
) => {
  callFn(...args, event.target.value)
}

/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleFormNumber, ["FormNumberTag"])}
 * ```
 */
export const onChangeNumberFnCall = (callFn: any, ...args: any) => (
  valueAsNumber: number,
  valueAsString: string
) => {
  callFn(...args, valueAsNumber, valueAsString)
}

/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <TagInput onChange={onChangeTagFnCall(props.simpleFormInput, ["FormTagsTag"])}
 * ```
 */
export const onChangeTagFnCall = (callFn: any, ...args: any) => (
  values: string[]
) => {
  callFn(...args, values)
}

/**
 * Utilities
 */

/**
 * @param oldState input from the event.target.value of a button (string)
 *                 or the oldState from Redux store (boolean)
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
 *
 * @param json likely JSON input as a string
 * @returns JSON or string if JSON.parse fails
 */
export const jsonOrString = (json: string) => {
  try {
    return JSON.parse(json)
  } catch (e) {
    return json
  }
}
