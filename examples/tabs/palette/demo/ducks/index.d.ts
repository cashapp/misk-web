import { IDefaultDispatch, IDefaultGlobalState } from "@misk/core";
export { dispatchSimpleNetwork } from "@misk/core";
import { History } from "history";
import { IPalleteState } from "./palette";
export * from "./palette";
/**
 * Redux Store State
 */
export interface IState extends IDefaultGlobalState {
    palette: IPalleteState;
}
/**
 * Dispatcher
 */
export interface IDispatchProps extends IDefaultDispatch {
}
export declare const rootDispatcher: IDispatchProps;
/**
 * State Selectors
 */
export declare const rootSelectors: (state: IState) => {
    simpleNetwork: any;
    palette: any;
};
/**
 * Reducers
 */
export declare const rootReducer: (history: History<any>) => import("redux").Reducer<{
    router: import("connected-react-router").RouterState;
    simpleNetwork: any;
    palette: any;
}, import("redux").AnyAction>;
/**
 * Sagas
 */
export declare function rootSaga(): IterableIterator<import("redux-saga/effects").AllEffect>;
