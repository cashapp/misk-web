import { IAction, IDefaultState } from "@misk/common";
import { AxiosRequestConfig } from "axios";
import { AllEffect } from "redux-saga/effects";
import { OutputSelector, ParametricSelector } from "reselect";
/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export declare enum SIMPLENETWORK {
    DELETE = "SIMPLENETWORK_DELETE",
    FAILURE = "SIMPLENETWORK_FAILURE",
    GET = "SIMPLENETWORK_GET",
    HEAD = "SIMPLENETWORK_HEAD",
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
export interface ISimpleNetworkPayload extends IDefaultState {
    requestConfig: AxiosRequestConfig;
    tag: string;
    url: string;
}
export interface IDispatchSimpleNetwork {
    simpleNetworkDelete: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.DELETE, ISimpleNetworkState>;
    simpleNetworkFailure: (tag: string, url: string, error: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.FAILURE, ISimpleNetworkState>;
    simpleNetworkGet: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.GET, ISimpleNetworkState>;
    simpleNetworkHead: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.HEAD, ISimpleNetworkState>;
    simpleNetworkPatch: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.PATCH, ISimpleNetworkState>;
    simpleNetworkPost: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.POST, ISimpleNetworkState>;
    simpleNetworkPut: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.PUT, ISimpleNetworkState>;
    simpleNetworkSuccess: (tag: string, url: string, error: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkState>;
}
export declare const dispatchSimpleNetwork: IDispatchSimpleNetwork;
export declare function watchSimpleNetworkSagas(): IterableIterator<AllEffect>;
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
export interface ISimpleNetworkState extends IDefaultState {
    [tag: string]: any | ISimpleNetworkPayload;
}
/**
 * Selector
 * A memoized, efficient way to compute and return the latest domain of the state
 */
export declare const simpleNetworkState: <T extends {
    simpleNetwork: ISimpleNetworkState;
}>(state: T) => ISimpleNetworkState;
export declare const simpleNetworkSelector: OutputSelector<{}, any, (res: ISimpleNetworkState) => any>;
export declare const getSimpleNetwork: ParametricSelector<{}, string, ISimpleNetworkPayload>;
export declare const querySimpleNetwork: ParametricSelector<{}, string, ISimpleNetworkPayload>;
