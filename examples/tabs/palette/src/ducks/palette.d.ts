import { IAction, IDefaultState } from "@misk/common"
import { IState } from "../ducks"
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
export declare const dispatchPalette: {
  dinosaur: () => IAction<
    PALETTE.DINOSAUR,
    {
      error: any
      loading: boolean
      success: boolean
    }
  >
  failure: (error: any) => IAction<PALETTE.FAILURE, any>
  success: (data: any) => IAction<PALETTE.SUCCESS, any>
}
export declare function watchPaletteSagas(): IterableIterator<
  import("redux-saga/effects").AllEffect
>
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export default function PaletteReducer(
  state: any,
  action: IAction<string, {}>
): any
/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface IPaletteState extends IDefaultState {
  [key: string]: any
}
/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
export declare const paletteState: (state: IState) => any
export declare const paletteSelector: import("reselect").OutputSelector<
  IState,
  any,
  (res: any) => any
>
