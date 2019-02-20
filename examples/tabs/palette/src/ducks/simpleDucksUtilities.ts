// import { fromJS } from "immutable"
import { escapeRegExp, filter, flatMap, isEmpty, isRegExp } from "lodash-es"
// import { all, AllEffect, put, takeEvery } from "redux-saga/effects"
// import { partition } from "lodash-es"

import { defaultState } from "@misk/core"
import createCachedSelector from "re-reselect"
import { createSelector, OutputSelector, ParametricSelector } from "reselect"

/**
 * simple*Ducks libraries common code
 */
/**
 * State Selectors
 * A memoized, efficient way to compute and return the latest domain of the state
 */
const selectSubState: <
  IState extends { [key: string]: ISubState | any },
  ISubState extends { toJS?: () => any }
>(
  domain: string
) => (state: IState) => ISubState = <
  IState extends { [key: string]: ISubState },
  ISubState extends { toJS?: () => any }
>(
  domain: string
) => (state: IState) => {
  return state[domain]
}

const subStateSelector: <
  IState extends { [key: string]: ISubState & any },
  ISubState extends { toJS?: () => any }
>(
  domain: string
) => OutputSelector<IState, any, (res: ISubState) => any> = <
  IState extends { [key: string]: ISubState },
  ISubState extends { toJS?: () => any }
>(
  domain: string
) =>
  createSelector(
    selectSubState<IState, ISubState>(domain),
    state => state.toJS()
  )

export const simpleRootSelector = <
  IState extends { [key: string]: ISubState & any },
  ISubState extends { toJS?: () => any }
>(
  domain: string,
  state: IState
) => subStateSelector<IState, ISubState>(domain)(state)

const flatFilterObject = (object: any, filterFn: (key: any) => boolean) =>
  flatMap(filter(Object.keys(object), filterFn), key => object[key])

const filterObject = (
  object: any,
  filterFn: string | ((key: any) => boolean)
) => {
  let matched = []
  let regMatched = []
  let escRegMatched = []
  if (typeof filterFn === "string") {
    const escMatch = escapeRegExp(filterFn)
    if (isRegExp(filterFn)) {
      regMatched = flatFilterObject(object, key => filterFn.test(key))
    }
    if (isRegExp(escMatch)) {
      escRegMatched = flatFilterObject(object, key => escMatch.test(key))
    }
    /** Choose the largest set of results from regExp, coersed regExp, and basic startsWith matching */
    matched = flatFilterObject(object, key => key.startsWith(filterFn))
    if (matched.length < regMatched.length) matched = regMatched
    if (matched.length < escRegMatched.length) matched = escRegMatched
  } else {
    matched = flatFilterObject(object, filterFn)
  }
  return matched
}

export const enum simpleType {
  array,
  boolean,
  number,
  object,
  string,
  tags
}

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

const flatResults = (results: object[], returnType: simpleType) => {
  if (results.length === 0) {
    return baseType(returnType)
  } else if (results.length === 1 && returnType != simpleType.tags) {
    return results[0]
  } else {
    return results
  }
}

const selectAndFilterState: <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
  tagKeysFilter?: string | ((key: any) => boolean),
  returnType?: simpleType
) => ParametricSelector<
  ISubState,
  string,
  any | ISubPayload | ISubPayload[]
> = <
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subStateSelector: (state: any) => ISubState,
  tagKeysFilter: string | ((key: any) => boolean) = "",
  returnType?: simpleType
) =>
  createCachedSelector(
    subStateSelector,
    (subState: ISubState, tagFilter: string) => {
      let tagFiltered = filterObject(subState, tagFilter)
      if (!isEmpty(tagKeysFilter)) {
        if (isEmpty(tagFiltered)) {
          return baseType(returnType)
        }
        tagFiltered = flatMap(tagFiltered, obj =>
          flatResults(filterObject(obj, tagKeysFilter), returnType)
        )
      }
      return isEmpty(tagFiltered)
        ? defaultState
        : flatResults(tagFiltered, returnType)
    },
    (state: ISubState, matched: ISubPayload[]) => matched
  )((state, match) => match)

export const simpleSelect = <
  IState extends { [key: string]: ISubState | any },
  ISubState extends { [key: string]: any },
  ISubPayload extends { [key: string]: any }
>(
  subState: any,
  tagFilter: string,
  tagKeysFilter: string | ((key: any) => boolean) = "",
  subStateSelector?: string | any,
  returnType?: simpleType
) => {
  if (subState.simpleTag) {
    
  }
  if (typeof subStateSelector === "string") {
    return selectAndFilterState<ISubState, ISubPayload>(
      selectSubState<IState, ISubState>(subStateSelector),
      tagKeysFilter,
      returnType
    )(subState, tagFilter)
  } else {
    return selectAndFilterState<ISubState, ISubPayload>(
      subStateSelector,
      tagKeysFilter,
      returnType
    )(subState, tagFilter)
  }
}

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
 * <InputGroup onChange={onChangeFnCall(props.simpleFormInput, "FormInputTag")}
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleFormNumber, "FormNumberTag")}
 * ```
 */

/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Button onClick={onClickFnCall(props.simpleNetworkPut, "PutTag", { ...requestBody })}
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
 * <InputGroup onChange={onChangeFnCall(props.simpleFormInput, "FormInputTag")}
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
 * <Checkbox onChange={onChangeToggleFnCall(props.simpleFormToggle, "FormToggleTag", simpleFormState)}
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
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleFormNumber, "FormNumberTag")}
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
 * <TagInput onChange={onChangeTagFnCall(props.simpleFormInput, "FormTagsTag")}
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
export const getPayloadTag = <T = any>(payload: { [tag: string]: T }) => {
  return payload[Object.keys(payload)[0]]
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
