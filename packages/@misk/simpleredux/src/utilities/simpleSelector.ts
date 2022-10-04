import { Map } from "immutable"
import { chain } from "lodash"
import get from "lodash/get"
import pick from "lodash/pick"
import createCachedSelector from "re-reselect"
import { createSelector, OutputSelector, ParametricSelector } from "reselect"
import { IRootState } from "../utilities"

/**
 * State Selectors
 * A memoized, efficient way to compute and return the latest domain of the state
 */
const selectSubState: <
  IState extends { [key: string]: ISubState },
  ISubState extends { [key: string]: any }
>(
  domain: string
) => (state: IState) => ISubState =
  <
    IState extends { [key: string]: ISubState },
    ISubState extends { [key: string]: any }
  >(
    domain: string
  ) =>
  (state: IState) => {
    return state[domain]
  }

const selectRawSubState: <
  IState extends Map<string, any>,
  ISubState extends { [key: string]: any }
>(
  domain: string
) => (state: IState) => ISubState =
  <IState extends Map<string, any>, ISubState extends { [key: string]: any }>(
    domain: string
  ) =>
  (state: IState) => {
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
  createSelector(selectRawSubState<IState, ISubState>(domain), state => state)

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
  createSelector(selectSubState<IState, ISubState>(domain), state =>
    state.toJS()
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

/** DEPRECATED */
export const enum simpleType {
  array,
  boolean,
  number,
  object,
  string,
  tags
}

/** DEPRECATED */
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

/** DEPRECATED */
export const simpleSelect = <
  IState extends { [key: string]: ISubState | any },
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subState: any,
  tagFilter: string,
  tagKeysFilter = "",
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
    defaultValue
  )(subState, path)
}

export const createSimpleSelectorGet: <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
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
    selectSubState<IState, ISubState>(subState.simpleTag)
  )(subState, paths)
}

export const createSimpleSelectorPick: <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState
) => ParametricSelector<
  ISubState,
  string | string[],
  any | ISubPayload | ISubPayload[]
> = <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState
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
 * Cached Redux Selector using Lodash Pick API that flattens resulting object and renames keys
 * https://lodash.com/docs#pick
 */
export const simpleSelectorPickTransform = <
  IState extends { [key: string]: ISubState | any },
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subState: any,
  paths: string | string[],
  keyLookup: { [key: string]: string },
  keyPathLookup: { [key: string]: string } | string
) => {
  if (!subState.simpleTag) {
    throw new Error(
      "@misk/simpleRedux:simpleSelect called with state that doesn't have a \"simpleTag\" key. Make sure you're passing in a state that is part of @misk/simpleredux."
    )
  }
  return createSimpleSelectorPickTransform<ISubState, ISubPayload>(
    selectSubState<IState, ISubState>(subState.simpleTag),
    keyLookup,
    keyPathLookup
  )(subState, paths)
}

export const createSimpleSelectorPickTransform: <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
  keyLookup: { [key: string]: string },
  keyPathLookup: { [key: string]: string } | string
) => ParametricSelector<
  ISubState,
  string | string[],
  any | ISubPayload | ISubPayload[]
> = <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
  keyLookup: { [key: string]: string },
  keyPathLookup: { [key: string]: string }
) =>
  createCachedSelector(
    // selector
    subStateSelector,
    // selection function to retrieve certain results from state
    (subState: ISubState, paths: string | string[]) =>
      chain(subState)
        .pick(paths)
        .transform((acc: any, value: any, key: string) => {
          acc[keyLookup[key]] = get(
            value,
            typeof keyPathLookup === "string"
              ? keyPathLookup
              : keyPathLookup[key]
          )
        }, {})
        .value(),
    // cache hit function
    (_, matched: ISubPayload) => matched
  )(
    // fn to generate the cache key, in this case the joined path
    (_, paths) =>
      (typeof paths === "string" && paths) || (paths as string[]).join(".")
  )
