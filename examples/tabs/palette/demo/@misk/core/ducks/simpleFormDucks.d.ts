import { IAction, IDefaultState } from "@misk/common";
import { AllEffect } from "redux-saga/effects";
import { OutputSelector, ParametricSelector } from "reselect";
export declare enum SIMPLEFORM {
    INPUT = "SIMPLEFORM_INPUT",
    FAILURE = "SIMPLEFORM_FAILURE",
    NUMBER = "SIMPLEFORM_NUMBER",
    SUCCESS = "SIMPLEFORM_SUCCESS",
    TOGGLE = "SIMPLEFORM_TOGGLE"
}
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
export declare function SimpleFormReducer(state: any, action: IAction<SIMPLEFORM, {}>): any;
export interface ISimpleFormState extends IDefaultState {
    [tag: string]: any | ISimpleFormPayload;
}
export declare const simpleFormState: <T extends {
    simpleForm: ISimpleFormState;
}>(state: T) => ISimpleFormState;
export declare const simpleFormSelector: OutputSelector<{}, any, (res: ISimpleFormState) => any>;
export declare const getSimpleForm: ParametricSelector<{}, string, ISimpleFormPayload>;
export declare const querySimpleForm: ParametricSelector<{}, string, ISimpleFormPayload>;
export declare const querySimpleFormData: ParametricSelector<{}, string, ISimpleFormPayload>;
export declare const valueSimpleForm: (simpleForm: ISimpleFormState, tag: string) => any;
export declare const valueSimpleFormTags: (simpleForm: ISimpleFormState, tag: string) => any[];
