import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { AnyAction, Reducer } from "redux";
import { AllEffect } from "redux-saga/effects";
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
}, AnyAction>;
/**
 * Sagas
 */
export declare function rootSaga(): IterableIterator<AllEffect>;
