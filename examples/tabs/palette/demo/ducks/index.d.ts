import { IDispatchSimpleNetwork, ISimpleNetworkState } from "@misk/core";
export { dispatchSimpleNetwork } from "@misk/core";
import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { AnyAction, Reducer } from "redux";
import { AllEffect } from "redux-saga/effects";
import { IPaletteState } from "./palette";
export * from "./palette";
/**
 * Redux Store State
 */
export interface IState {
    palette: IPaletteState;
    router: Reducer<RouterState, LocationChangeAction>;
    simpleNetwork: ISimpleNetworkState;
}
/**
 * Dispatcher
 */
export interface IDispatchProps extends IDispatchSimpleNetwork {
}
export declare const rootDispatcher: IDispatchProps;
/**
 * State Selectors
 */
export declare const rootSelectors: (state: IState) => {
    palette: any;
    simpleNetwork: any;
};
/**
 * Reducers
 */
export declare const rootReducer: (history: History<any>) => Reducer<{
    palette: any;
    router: RouterState;
    simpleNetwork: any;
}, AnyAction>;
/**
 * Sagas
 */
export declare function rootSaga(): IterableIterator<AllEffect>;
