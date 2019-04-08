import { IAction, IRootState } from "@misk/simpleredux";
import { Map } from "immutable";
import { AllEffect } from "redux-saga/effects";
/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export declare enum PALETTE {
    DINOSAUR = "PALETTE_DINOSAUR",
    SUCCESS = "PALETTE_SUCCESS",
    FAILURE = "PALETTE_FAILURE"
}
/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export interface IPalettePayload {
    data?: any;
    error: any;
    loading: boolean;
    success: boolean;
}
export interface IDispatchPalette {
    paletteDinosaur: (data: any, fieldTag: string, formTag: string) => IAction<PALETTE.DINOSAUR, IPalettePayload>;
    paletteFailure: (error: any) => IAction<PALETTE.FAILURE, IPalettePayload>;
    paletteSuccess: (data: any) => IAction<PALETTE.SUCCESS, IPalettePayload>;
}
export declare const dispatchPalette: IDispatchPalette;
export declare function watchPaletteSagas(): IterableIterator<AllEffect>;
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export declare const PaletteReducer: (state: any, action: IAction<string, {}>) => any;
/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface IPaletteState extends IRootState {
    [key: string]: any;
}
export interface IPaletteImmutableState extends Map<string, any> {
    toJS: () => IPaletteState;
}
