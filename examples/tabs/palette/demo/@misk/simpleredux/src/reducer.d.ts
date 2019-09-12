import { IAction, IRootState } from "./utilities";
import { SIMPLEREDUX } from "./action";
import { ISimpleReduxPayload } from "./dispatch";
/**
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export declare function SimpleReduxReducer(state: any, action: IAction<SIMPLEREDUX, {}>): any;
/**
 * Interface for the SimpleRedux state that is stored in Redux wrapped in an ImmutableJS object
 */
export interface ISimpleReduxState extends IRootState {
    [tag: string]: any | ISimpleReduxPayload;
}
/**
 * Interface for a SimpleRedux state wrapped in an ImmutableJS object, as it is in Redux
 */
export interface ISimpleReduxImmutableState {
    toJS: () => ISimpleReduxState;
}
/** DEPRECATED: Use [SimpleReduxReducer] instead */
export declare const SimpleNetworkReducer: typeof SimpleReduxReducer;
/** DEPRECATED: Use [ISimpleReduxState] instead */
export interface ISimpleNetworkState extends IRootState {
    [tag: string]: any | ISimpleReduxPayload;
}
/** DEPRECATED: Use [ISimpleReduxImmutableState] instead */
export interface ISimpleNetworkImmutableState {
    toJS: () => ISimpleNetworkState;
}
/** DEPRECATED: Use [SimpleReduxReducer] instead */
export declare const SimpleFormReducer: typeof SimpleReduxReducer;
/** DEPRECATED: Use [ISimpleReduxState] instead */
export interface ISimpleFormState extends IRootState {
    [tag: string]: any | ISimpleReduxPayload;
}
/** DEPRECATED: Use [ISimpleReduxImmutableState] instead */
export interface ISimpleFormImmutableState {
    toJS: () => ISimpleFormState;
}
