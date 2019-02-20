import {
  createAction,
  defaultState,
  IAction,
  IDefaultState
} from "@misk/common"
import { fromJS } from "immutable"
import { partition } from "lodash-es"
import createCachedSelector from "re-reselect"
import { all, AllEffect, put, takeEvery } from "redux-saga/effects"
import { createSelector, OutputSelector, ParametricSelector } from "reselect"
import { booleanToggle, getPayloadTag, simpleSelect } from "."
import { simpleType } from "./simpleDucksUtilities"

const simpleTag = "simpleForm"

/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export enum SIMPLEFORM {
  INPUT = "SIMPLEFORM_INPUT",
  FAILURE = "SIMPLEFORM_FAILURE",
  NUMBER = "SIMPLEFORM_NUMBER",
  SUCCESS = "SIMPLEFORM_SUCCESS",
  TOGGLE = "SIMPLEFORM_TOGGLE"
}

/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export interface ISimpleFormPayload extends IDefaultState {
  oldToggle?: string | boolean
  tag: string
  valueAsString?: string
  valueAsNumber?: number
}

export interface IDispatchSimpleForm {
  simpleFormFailure: (
    tag: string,
    error: any
  ) => IAction<SIMPLEFORM.FAILURE, ISimpleFormState>
  simpleFormInput: (
    tag: string,
    data: any
  ) => IAction<SIMPLEFORM.INPUT, ISimpleFormState>
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => IAction<SIMPLEFORM.NUMBER, ISimpleFormState>
  simpleFormSuccess: (
    tag: string,
    data: any
  ) => IAction<SIMPLEFORM.SUCCESS, ISimpleFormState>
  simpleFormToggle: (
    tag: string,
    oldState: any
  ) => IAction<SIMPLEFORM.TOGGLE, ISimpleFormState>
}

export const dispatchSimpleForm: IDispatchSimpleForm = {
  simpleFormFailure: (tag: string, error: any) =>
    createAction<SIMPLEFORM.FAILURE, ISimpleFormState>(SIMPLEFORM.FAILURE, {
      // simpleTag,
      [tag]: {
        ...error,
        loading: false,
        success: false,
        tag
      }
    }),
  simpleFormInput: (tag: string, data: any) =>
    createAction<SIMPLEFORM.INPUT, ISimpleFormState>(SIMPLEFORM.INPUT, {
      // simpleTag,
      [tag]: {
        data,
        error: null,
        loading: true,
        success: false,
        tag
      }
    }),
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) =>
    createAction<SIMPLEFORM.NUMBER, ISimpleFormState>(SIMPLEFORM.NUMBER, {
      // simpleTag,
      [tag]: {
        data: valueAsString,
        error: null,
        loading: true,
        success: false,
        tag
      }
    }),
  simpleFormSuccess: (tag: string, data: any) =>
    createAction<SIMPLEFORM.SUCCESS, ISimpleFormState>(SIMPLEFORM.SUCCESS, {
      // simpleTag,
      [tag]: {
        ...data,
        error: null,
        loading: false,
        success: true,
        tag
      }
    }),
  simpleFormToggle: (tag: string, oldState: any) =>
    createAction<SIMPLEFORM.TOGGLE, ISimpleFormState>(SIMPLEFORM.TOGGLE, {
      // simpleTag,
      [tag]: {
        oldToggle: simpleSelect(oldState, tag, "data", simpleType.boolean),
        error: null,
        loading: true,
        success: false,
        tag
      }
    })
}

/**
 * Sagas are generating functions that consume actions and
 * pass either latest (takeLatest) or every (takeEvery) action
 * to a handling generating function.
 *
 * Handling function is where obtaining web resources is done
 * Web requests are done within try/catch so that
 *  if request fails: a failure action is dispatched
 *  if request succeeds: a success action with the data is dispatched
 * Further processing of the data should be minimized within the handling
 *  function to prevent unhelpful errors. Ie. a failed request error is
 *  returned but it actually was just a parsing error within the try/catch.
 */

function* handleBasicRequest(action: IAction<SIMPLEFORM, ISimpleFormState>) {
  try {
    const { data, tag } = getPayloadTag(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormSuccess(tag, {
        ...getPayloadTag(action.payload),
        data
      })
    )
  } catch (e) {
    const { tag } = getPayloadTag(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormFailure(tag, {
        ...getPayloadTag(action.payload),
        ...e
      })
    )
  }
}

function* handleToggle(action: IAction<SIMPLEFORM, ISimpleFormState>) {
  try {
    const { oldToggle, tag } = getPayloadTag<ISimpleFormPayload>(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormSuccess(tag, {
        ...getPayloadTag<ISimpleFormPayload>(action.payload),
        data: booleanToggle(oldToggle)
      })
    )
  } catch (e) {
    const { tag } = getPayloadTag<ISimpleFormPayload>(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormFailure(tag, {
        ...getPayloadTag<ISimpleFormPayload>(action.payload),
        ...e
      })
    )
  }
}

export function* watchSimpleFormSagas(): IterableIterator<AllEffect> {
  yield all([
    takeEvery(SIMPLEFORM.INPUT, handleBasicRequest),
    takeEvery(SIMPLEFORM.NUMBER, handleBasicRequest),
    takeEvery(SIMPLEFORM.TOGGLE, handleToggle)
  ])
}

/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialState = fromJS({
  simpleTag,
  ...defaultState.toJS()
})

/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export function SimpleFormReducer(
  state = initialState,
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

export interface ISimpleFormState extends IDefaultState {
  simpleTag: string
  [tag: string]: any | ISimpleFormPayload
}

/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
export const simpleFormState = <T extends { simpleForm: ISimpleFormState }>(
  state: T
) => state.simpleForm

export const simpleFormSelector: OutputSelector<
  {},
  any,
  (res: ISimpleFormState) => any
> = createSelector(
  simpleFormState,
  state => state.toJS()
)

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
