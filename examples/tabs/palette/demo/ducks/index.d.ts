import { IDispatchSimpleNetworkProps, ISimpleNetworkState } from "@misk/core";
export { dispatchSimpleNetwork } from "@misk/core";
import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { Reducer } from "redux";
import { IPalleteState } from "./palette";
export * from "./palette";
/**
 * Redux Store State
 */
export interface IState {
    palette: IPalleteState;
    router: Reducer<RouterState, LocationChangeAction>;
    simpleNetwork: ISimpleNetworkState;
}
export interface IDispatchPaletteDucksProps extends IDispatchSimpleNetworkProps {
}
/**
 * Reducers
 */
export declare const rootReducer: (history: History<any>) => Reducer<{
    palette: any;
    router: RouterState;
    simpleNetwork: any;
}, import("redux").AnyAction>;
/**
 * Sagas
 */
export declare function rootSaga(): IterableIterator<import("redux-saga/effects").AllEffect>;
