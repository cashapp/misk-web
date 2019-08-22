import { IAction, IDefaultState, IRootState, SimpleReduxSaga } from "./utilities";
export declare enum SIMPLEFORM {
    INPUT = "SIMPLEFORM_INPUT",
    FAILURE = "SIMPLEFORM_FAILURE",
    NUMBER = "SIMPLEFORM_NUMBER",
    SUCCESS = "SIMPLEFORM_SUCCESS",
    TOGGLE = "SIMPLEFORM_TOGGLE"
}
export interface ISimpleFormPayloadTag extends IDefaultState {
    oldToggle?: string | boolean;
    tag: string;
    valueAsString?: string;
    valueAsNumber?: number;
}
export interface ISimpleFormPayload {
    [tag: string]: ISimpleFormPayloadTag;
}
export interface IDispatchSimpleForm {
    simpleFormFailure: (tag: string, error: any) => IAction<SIMPLEFORM.FAILURE, ISimpleFormPayload>;
    simpleFormInput: (tag: string, data: any) => IAction<SIMPLEFORM.INPUT, ISimpleFormPayload>;
    simpleFormNumber: (tag: string, valueAsNumber: number, valueAsString: string) => IAction<SIMPLEFORM.NUMBER, ISimpleFormPayload>;
    simpleFormSuccess: (tag: string, data: any) => IAction<SIMPLEFORM.SUCCESS, ISimpleFormPayload>;
    simpleFormToggle: (tag: string, oldState: any) => IAction<SIMPLEFORM.TOGGLE, ISimpleFormPayload>;
}
export declare const dispatchSimpleForm: IDispatchSimpleForm;
export declare function watchSimpleFormSagas(): SimpleReduxSaga;
export declare function SimpleFormReducer(state: any, action: IAction<SIMPLEFORM, {}>): any;
export interface ISimpleFormState extends IRootState {
    [tag: string]: any | ISimpleFormPayload;
}
export interface ISimpleFormImmutableState {
    toJS: () => ISimpleFormState;
}
