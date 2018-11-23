import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { Reducer } from "redux";
import { ILoaderState } from "./loader";
export * from "./loader";
/**
 * Redux Store State
 */
export interface IState {
    loader: ILoaderState;
    router: Reducer<RouterState, LocationChangeAction>;
}
/**
 * Reducers
 */
export declare const rootReducer: (history: History<any>) => Reducer<{
    loader: any;
    router: RouterState;
}, import("redux").AnyAction>;
/**
 * Sagas
 */
export declare function rootSaga(): IterableIterator<import("redux-saga/effects").AllEffect>;
