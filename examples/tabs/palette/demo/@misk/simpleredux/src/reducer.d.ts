import { IAction, IRootState } from "./utilities";
import { SIMPLEFORM, SIMPLENETWORK } from "./action";
import { ISimpleFormPayload, ISimpleNetworkPayload } from "./dispatch";
export declare function SimpleNetworkReducer(state: any, action: IAction<SIMPLENETWORK, {}>): any;
export interface ISimpleNetworkState extends IRootState {
    [tag: string]: any | ISimpleNetworkPayload;
}
export interface ISimpleNetworkImmutableState {
    toJS: () => ISimpleNetworkState;
}
export declare function SimpleFormReducer(state: any, action: IAction<SIMPLEFORM, {}>): any;
export interface ISimpleFormState extends IRootState {
    [tag: string]: any | ISimpleFormPayload;
}
export interface ISimpleFormImmutableState {
    toJS: () => ISimpleFormState;
}
