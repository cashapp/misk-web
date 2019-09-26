import { IAction, IRootState, SimpleReduxSaga } from "@misk/simpleredux";
import { Map } from "immutable";
/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export declare enum STARTERBASIC {
    DINOSAUR = "STARTERBASIC_DINOSAUR",
    SUCCESS = "STARTERBASIC_SUCCESS",
    FAILURE = "STARTERBASIC_FAILURE"
}
/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export interface IStarterBasicPayload {
    data?: any;
    error: any;
    loading: boolean;
    success: boolean;
}
export interface IDispatchStarterBasic {
    starterBasicDinosaur: (data: any, fieldTag: string, formTag: string) => IAction<STARTERBASIC.DINOSAUR, IStarterBasicPayload>;
    starterBasicFailure: (error: any) => IAction<STARTERBASIC.FAILURE, IStarterBasicPayload>;
    starterBasicSuccess: (data: any) => IAction<STARTERBASIC.SUCCESS, IStarterBasicPayload>;
}
export declare const dispatchStarterBasic: IDispatchStarterBasic;
export declare function watchStarterBasicSagas(): SimpleReduxSaga;
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export declare const StarterBasicReducer: (state: any, action: IAction<STARTERBASIC, {}>) => any;
/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface IStarterBasicState extends IRootState {
    [key: string]: any;
}
export interface IStarterBasicImmutableState extends Map<string, any> {
    toJS: () => IStarterBasicState;
}
