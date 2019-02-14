// import { fromJS } from "immutable"
// import { all, AllEffect, put, takeEvery } from "redux-saga/effects"
import { partition } from "lodash-es"
import createCachedSelector from "re-reselect"
// import { createSelector, OutputSelector, ParametricSelector } from "reselect"
import { createSelector, OutputSelector } from "reselect"

/**
 * simple*Ducks libraries common code
 */
/**
 * State Selectors
 */
export const selectState = <
  SubStateInterface,
  StateInterface extends { [domain: string]: SubStateInterface }
>(
  domain: string
) => (state: StateInterface) => state[domain]

export const stateSelector: <
  SubStateInterface extends { toJS?: () => any },
  StateInterface extends { [key: string]: any }
>(
  domain: string
) => OutputSelector<StateInterface, any, (res: SubStateInterface) => any> = <
  SubStateInterface extends { toJS?: () => any },
  StateInterface extends { [key: string]: any }
>(
  domain: string
) =>
  createSelector(
    selectState<SubStateInterface, StateInterface>(domain),
    state => state.toJS()
  )

/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */

export const getSimpleForm: ParametricSelector<
  {},
  string,
  ISimpleFormPayload
> = createCachedSelector(
  simpleFormState,
  (simpleForm: ISimpleFormState, tag: string) =>
    simpleForm[tag] ? simpleForm[tag] : defaultState,
  (state: ISimpleFormState, tagResponse: ISimpleFormPayload) => tagResponse
)((state, tag) => tag)

export const querySimpleForm: ParametricSelector<
  {},
  string,
  ISimpleFormPayload
> = createCachedSelector(
  simpleFormState,
  (simpleForm: ISimpleFormState, tag: string) => {
    return partition(Object.keys(simpleForm), k => k.startsWith(tag))[0]
      .length > 0
      ? partition(Object.keys(simpleForm), k => k.startsWith(tag))[0].map(
          k => simpleForm[k]
        )
      : defaultState
  },
  (state: ISimpleFormState, tagResponse: ISimpleFormPayload) => tagResponse
)((state, tag) => tag)

export const querySimpleFormData: ParametricSelector<
  {},
  string,
  ISimpleFormPayload
> = createCachedSelector(
  simpleFormState,
  (simpleForm: ISimpleFormState, tag: string) => {
    return partition(Object.keys(simpleForm), k => k.startsWith(tag))[0]
      .length > 0
      ? partition(Object.keys(simpleForm), k => k.startsWith(tag))[0].map(
          k => ({ [k]: simpleForm[k].data })
        )
      : defaultState
  },
  (state: ISimpleFormState, tagResponse: ISimpleFormPayload) => tagResponse
)((state, tag) => tag)

export const valueSimpleForm = (simpleForm: ISimpleFormState, tag: string) => {
  try {
    const { data } = getSimpleForm(simpleForm, tag)
    return data
  } catch (e) {}
}

export const valueSimpleFormTags = (
  simpleForm: ISimpleFormState,
  tag: string
) => {
  try {
    const data = valueSimpleForm(simpleForm, tag)
    if (data instanceof Array) {
      return data
    } else {
      return [] as string[]
    }
  } catch (e) {
    return [] as string[]
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
export const onClickFnCall = (callFn: any, args: any[]) => (event: any) => {
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
export const onChangeFnCall = (callFn: any, args: any[]) => (event: any) => {
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
export const onChangeToggleFnCall = (callFn: any, args: any[]) => (
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
export const onChangeNumberFnCall = (callFn: any, args: any[]) => (
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
export const onChangeTagFnCall = (callFn: any, args: any[]) => (
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
