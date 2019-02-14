import { IAction, IDefaultState } from "@misk/common";
import { AllEffect } from "redux-saga/effects";
import { OutputSelector, ParametricSelector } from "reselect";
/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export declare enum SIMPLEFORM {
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
    oldToggle?: string | boolean;
    tag: string;
    valueAsString?: string;
    valueAsNumber?: number;
}
export interface IDispatchSimpleForm {
    simpleFormFailure: (tag: string, error: any) => IAction<SIMPLEFORM.FAILURE, ISimpleFormState>;
    simpleFormInput: (tag: string, data: any) => IAction<SIMPLEFORM.INPUT, ISimpleFormState>;
    simpleFormNumber: (tag: string, valueAsNumber: number, valueAsString: string) => IAction<SIMPLEFORM.NUMBER, ISimpleFormState>;
    simpleFormSuccess: (tag: string, data: any) => IAction<SIMPLEFORM.SUCCESS, ISimpleFormState>;
    simpleFormToggle: (tag: string, oldState: any) => IAction<SIMPLEFORM.TOGGLE, ISimpleFormState>;
}
export declare const dispatchSimpleForm: IDispatchSimpleForm;
export declare function watchSimpleFormSagas(): IterableIterator<AllEffect>;
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export declare function SimpleFormReducer(state: any, action: IAction<SIMPLEFORM, {}>): any;
/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface ISimpleFormState extends IDefaultState {
    [tag: string]: any | ISimpleFormPayload;
}
/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
export declare const simpleFormState: <T extends {
    simpleForm: ISimpleFormState;
}>(state: T) => ISimpleFormState;
export declare const simpleFormSelector: OutputSelector<{}, any, (res: ISimpleFormState) => any>;
export declare const getSimpleForm: ParametricSelector<{}, string, ISimpleFormPayload>;
export declare const querySimpleForm: ParametricSelector<{}, string, ISimpleFormPayload>;
export declare const querySimpleFormData: ParametricSelector<{}, string, ISimpleFormPayload>;
export declare const valueSimpleForm: (simpleForm: ISimpleFormState, tag: string) => any;
export declare const valueSimpleFormTags: (simpleForm: ISimpleFormState, tag: string) => any[];
