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
