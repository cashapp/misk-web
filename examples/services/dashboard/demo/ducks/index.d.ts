import { IDefaultDispatch, IDefaultGlobalState } from "@misk/core";
export { dispatchSimpleNetwork } from "@misk/core";
import { History } from "history";
/**
 * Redux Store State
 */
export interface IState extends IDefaultGlobalState {
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
    /**
     * Reducers
     */
    simpleNetwork: any;
};
/**
 * Reducers
 */
export declare const rootReducer: (history: History<any>) => import("redux").Reducer<{
    router: import("connected-react-router").RouterState;
    simpleNetwork: any;
}, import("redux").AnyAction>;
/**
 * Sagas
 */
export declare function rootSaga(): IterableIterator<import("redux-saga/effects").GenericAllEffect<any>>;
