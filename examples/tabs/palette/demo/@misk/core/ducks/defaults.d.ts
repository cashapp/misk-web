import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { Reducer } from "redux";
import { IDispatchSimpleNetwork, ISimpleNetworkState, SimpleNetworkReducer } from "../ducks";
/**
 * Redux Store State
 */
export interface IDefaultGlobalState {
    router: Reducer<RouterState, LocationChangeAction>;
    simpleNetwork: ISimpleNetworkState;
}
/**
 * Dispatcher
 */
export interface IDefaultDispatch extends IDispatchSimpleNetwork {
}
export declare const defaultDispatcher: IDefaultDispatch;
/**
 * State Selectors
 */
export declare const defaultSelectors: <T extends IDefaultGlobalState>(state: T) => {
    simpleNetwork: any;
};
/**
 * Reducers
 */
export declare const defaultReducers: (history: History<any>) => {
    router: Reducer<RouterState, LocationChangeAction>;
    simpleNetwork: typeof SimpleNetworkReducer;
};
/**
 * Sagas
 */
export declare const defaultSagas: import("redux-saga/effects").ForkEffect[];
