import { IAction, IDefaultState } from "@misk/common";
import { AxiosRequestConfig } from "axios";
import { AllEffect } from "redux-saga/effects";
import { OutputSelector, ParametricSelector } from "reselect";
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
export declare function SimpleNetworkReducer(state: any, action: IAction<SIMPLENETWORK, {}>): any;
export interface ISimpleNetworkState extends IDefaultState {
    [tag: string]: any | ISimpleNetworkPayload;
}
export declare const simpleNetworkState: <T extends {
    simpleNetwork: ISimpleNetworkState;
}>(state: T) => ISimpleNetworkState;
export declare const simpleNetworkSelector: OutputSelector<{}, any, (res: ISimpleNetworkState) => any>;
export declare const getSimpleNetwork: ParametricSelector<{}, string, ISimpleNetworkPayload>;
export declare const querySimpleNetwork: ParametricSelector<{}, string, ISimpleNetworkPayload>;
