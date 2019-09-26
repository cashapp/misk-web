import { IAction, IRootState, SimpleReduxSaga } from "@misk/simpleredux";
import { Map } from "immutable";
/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export declare enum PALETTEEXEMPLAR {
    DINOSAUR = "PALETTEEXEMPLAR_DINOSAUR",
    SUCCESS = "PALETTEEXEMPLAR_SUCCESS",
    FAILURE = "PALETTEEXEMPLAR_FAILURE"
}
/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export interface IPaletteExemplarPayload {
    data?: any;
    error: any;
    loading: boolean;
    success: boolean;
}
export interface IDispatchPaletteExemplar {
    paletteExemplarDinosaur: (data: any, fieldTag: string, formTag: string) => IAction<PALETTEEXEMPLAR.DINOSAUR, IPaletteExemplarPayload>;
    paletteExemplarFailure: (error: any) => IAction<PALETTEEXEMPLAR.FAILURE, IPaletteExemplarPayload>;
    paletteExemplarSuccess: (data: any) => IAction<PALETTEEXEMPLAR.SUCCESS, IPaletteExemplarPayload>;
}
export declare const dispatchPaletteExemplar: IDispatchPaletteExemplar;
export declare function watchPaletteExemplarSagas(): SimpleReduxSaga;
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export declare const PaletteExemplarReducer: (state: any, action: IAction<PALETTEEXEMPLAR, {}>) => any;
/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface IPaletteExemplarState extends IRootState {
    [key: string]: any;
}
export interface IPaletteExemplarImmutableState extends Map<string, any> {
    toJS: () => IPaletteExemplarState;
}
