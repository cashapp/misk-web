import { all, put, takeLatest } from "redux-saga/effects"
import {
  booleanToggle,
  createAction,
  defaultRootState,
  getFirstTag,
  IAction,
  IDefaultState,
  IRootState,
  simpleSelect,
  simpleType,
  SimpleReduxSaga
} from "./utilities"

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
export interface ISimpleFormPayloadTag extends IDefaultState {
  oldToggle?: string | boolean
  tag: string
  valueAsString?: string
  valueAsNumber?: number
}

export interface ISimpleFormPayload {
  [tag: string]: ISimpleFormPayloadTag
}

export interface IDispatchSimpleForm {
  simpleFormFailure: (
    tag: string,
    error: any
  ) => IAction<SIMPLEFORM.FAILURE, ISimpleFormPayload>
  simpleFormInput: (
    tag: string,
    data: any
  ) => IAction<SIMPLEFORM.INPUT, ISimpleFormPayload>
  simpleFormNumber: (
    tag: string,
    valueAsNumber: number,
    valueAsString: string
  ) => IAction<SIMPLEFORM.NUMBER, ISimpleFormPayload>
  simpleFormSuccess: (
    tag: string,
    data: any
  ) => IAction<SIMPLEFORM.SUCCESS, ISimpleFormPayload>
  simpleFormToggle: (
    tag: string,
    oldState: any
  ) => IAction<SIMPLEFORM.TOGGLE, ISimpleFormPayload>
}

export const dispatchSimpleForm: IDispatchSimpleForm = {
  simpleFormFailure: (tag: string, error: any) =>
    createAction<SIMPLEFORM.FAILURE, ISimpleFormPayload>(SIMPLEFORM.FAILURE, {
      [tag]: {
        ...error,
        loading: false,
        success: false,
        tag
      }
    }),
  simpleFormInput: (tag: string, data: any) =>
    createAction<SIMPLEFORM.INPUT, ISimpleFormPayload>(SIMPLEFORM.INPUT, {
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
    createAction<SIMPLEFORM.NUMBER, ISimpleFormPayload>(SIMPLEFORM.NUMBER, {
      [tag]: {
        data: valueAsString,
        error: null,
        loading: true,
        success: false,
        tag
      }
    }),
  simpleFormSuccess: (tag: string, data: any) =>
    createAction<SIMPLEFORM.SUCCESS, ISimpleFormPayload>(SIMPLEFORM.SUCCESS, {
      [tag]: {
        ...data,
        error: null,
        loading: false,
        success: true,
        tag
      }
    }),
  simpleFormToggle: (tag: string, oldState: any) =>
    createAction<SIMPLEFORM.TOGGLE, ISimpleFormPayload>(SIMPLEFORM.TOGGLE, {
      [tag]: {
        oldToggle: simpleSelect(oldState, tag, "data", simpleType.boolean),
        data: null,
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

function* handleBasicRequest(action: IAction<SIMPLEFORM, ISimpleFormPayload>) {
  try {
    const { data, tag } = getFirstTag<ISimpleFormPayloadTag>(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormSuccess(tag, {
        ...getFirstTag<ISimpleFormPayloadTag>(action.payload),
        data
      })
    )
  } catch (e) {
    const { tag } = getFirstTag<ISimpleFormPayloadTag>(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormFailure(tag, {
        ...getFirstTag<ISimpleFormPayloadTag>(action.payload),
        ...e
      })
    )
  }
}

function* handleToggle(action: IAction<SIMPLEFORM, ISimpleFormPayload>) {
  try {
    const { oldToggle, tag } = getFirstTag<ISimpleFormPayloadTag>(
      action.payload
    )
    yield put(
      dispatchSimpleForm.simpleFormSuccess(tag, {
        ...getFirstTag<ISimpleFormPayloadTag>(action.payload),
        data: booleanToggle(oldToggle)
      })
    )
  } catch (e) {
    const { tag } = getFirstTag<ISimpleFormPayloadTag>(action.payload)
    yield put(
      dispatchSimpleForm.simpleFormFailure(tag, {
        ...getFirstTag<ISimpleFormPayloadTag>(action.payload),
        ...e
      })
    )
  }
}

export function* watchSimpleFormSagas(): SimpleReduxSaga {
  yield all([
    takeLatest(SIMPLEFORM.INPUT, handleBasicRequest),
    takeLatest(SIMPLEFORM.NUMBER, handleBasicRequest),
    takeLatest(SIMPLEFORM.TOGGLE, handleToggle)
  ])
}

/**
 * Initial State
 * Reducer merges all changes from dispatched action objects on to this initial state
 */
const initialState = defaultRootState(simpleTag)

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

export interface ISimpleFormState extends IRootState {
  [tag: string]: any | ISimpleFormPayload
}

export interface ISimpleFormImmutableState {
  toJS: () => ISimpleFormState
}
