import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { Reducer } from "redux";
import { IExampleState } from "./example";
export * from "./example";
/**
 * Redux Store State
 */
export interface IState {
    example: IExampleState;
    router: Reducer<RouterState, LocationChangeAction>;
}
/**
 * Reducers
 */
export declare const rootReducer: (history: History<any>) => Reducer<{
    example: any;
    router: RouterState;
}, import("redux").AnyAction>;
/**
 * Sagas
 */
export declare function rootSaga(): IterableIterator<import("redux-saga/effects").AllEffect>;
