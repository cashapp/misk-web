import { IAction, IDefaultState } from "@misk/common";
import { AxiosRequestConfig } from "axios";
/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export declare enum SIMPLENETWORK {
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
export interface ISimpleNetworkPayload {
    error: any;
    loading: boolean;
    requestConfig: AxiosRequestConfig;
    success: boolean;
    tag: string;
    url: string;
}
export interface IDispatchSimpleNetwork {
    delete: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.DELETE, ISimpleNetworkPayload>;
    failure: (error: any) => IAction<SIMPLENETWORK.FAILURE, ISimpleNetworkPayload>;
    get: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.GET, ISimpleNetworkPayload>;
    patch: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.PATCH, ISimpleNetworkPayload>;
    post: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.POST, ISimpleNetworkPayload>;
    put: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.PUT, ISimpleNetworkPayload>;
    success: (data: any) => IAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkPayload>;
}
export declare const dispatchSimpleNetwork: IDispatchSimpleNetwork;
export declare function watchSimpleNetworkSagas(): IterableIterator<import("redux-saga/effects").AllEffect>;
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export declare function SimpleNetworkReducer(state: any, action: IAction<SIMPLENETWORK, {}>): any;
/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface ISimpleNetworkTagResponse {
    data: any | null;
    error: any | null;
}
export interface ISimpleNetworkState extends IDefaultState {
    tags: {
        [tag: string]: ISimpleNetworkTagResponse;
    };
}
/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
export declare const simpleNetworkState: <T extends {
    simpleNetwork: ISimpleNetworkState;
}>(state: T) => ISimpleNetworkState;
export declare const simpleNetworkSelector: import("reselect").OutputSelector<{}, any, (res: ISimpleNetworkState) => any>;
export declare const response: import("re-reselect").ParametricSelector<{}, string, ISimpleNetworkTagResponse> & {
    resultFunc: (res1: ISimpleNetworkState, res2: ISimpleNetworkTagResponse) => ISimpleNetworkTagResponse;
    recomputations: () => number;
    resetRecomputations: () => number;
} & {
    getMatchingSelector: (state: {}, props: string, ...args: any[]) => import("re-reselect").OutputParametricSelector<{}, string, ISimpleNetworkTagResponse, (res1: ISimpleNetworkState, res2: ISimpleNetworkTagResponse) => ISimpleNetworkTagResponse>;
    removeMatchingSelector: (state: {}, props: string, ...args: any[]) => void;
    clearCache: () => void;
    resultFunc: (res1: ISimpleNetworkState, res2: ISimpleNetworkTagResponse) => ISimpleNetworkTagResponse;
    cache: import("re-reselect").ICacheObject;
};
