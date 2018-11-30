import { IAction, IDefaultState } from "@misk/common";
import { AxiosRequestConfig } from "axios";
/**
 *   TODO: ROUTER SAGA
 *
 * from: React-Redux-Saga-Advanced-Starter / src/exampleSagas
 * In case you need to use a selector
 * import also select from redux-saga/effects
 * and then simplie yield select(yourSelector())
 * In case you need to redirect to whatever route
 * import { push } from react-router-redux and then
 * yield put(push('/next-page'))
 *
 */
/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export declare enum ROUTER {
    DELETE = "SIMPLENETWORK_DELETE",
    FAILURE = "SIMPLENETWORK_FAILURE",
    GET = "SIMPLENETWORK_GET",
    PATCH = "SIMPLENETWORK_PATCH",
    POST = "SIMPLENETWORK_POST",
    PUT = "SIMPLENETWORK_PUT",
    SUCCESS = "SIMPLENETWORK_SUCCESS"
}
/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export interface IRouterPayload {
    error: any;
    loading: boolean;
    requestConfig: AxiosRequestConfig;
    success: boolean;
    tag: string;
    url: string;
}
export interface IDispatchRouterProps {
    delete: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<ROUTER.DELETE, IRouterPayload>;
    failure: (error: any) => IAction<ROUTER.FAILURE, IRouterPayload>;
    get: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<ROUTER.GET, IRouterPayload>;
    patch: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<ROUTER.PATCH, IRouterPayload>;
    post: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<ROUTER.POST, IRouterPayload>;
    put: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<ROUTER.PUT, IRouterPayload>;
    success: (data: any) => IAction<ROUTER.SUCCESS, IRouterPayload>;
}
export declare const dispatchRouter: IDispatchRouterProps;
export declare function watchRouterSagas(): IterableIterator<import("redux-saga/effects").AllEffect>;
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export declare function RouterReducer(state: any, action: IAction<ROUTER, {}>): any;
/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface IRouterState extends IDefaultState {
    tags: {
        [tag: string]: {
            data: any | null;
            error: any | null;
        };
    };
}
/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
