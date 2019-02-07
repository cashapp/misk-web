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
export interface ISimpleNetworkPayload {
    error: any;
    loading: boolean;
    requestConfig: AxiosRequestConfig;
    success: boolean;
    tag: string;
    url: string;
}
export interface IDispatchSimpleNetwork {
    simpleNetworkDelete: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.DELETE, ISimpleNetworkPayload>;
    simpleNetworkFailure: (error: any) => IAction<SIMPLENETWORK.FAILURE, ISimpleNetworkPayload>;
    simpleNetworkGet: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.GET, ISimpleNetworkPayload>;
    simpleNetworkHead: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.HEAD, ISimpleNetworkPayload>;
    simpleNetworkPatch: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.PATCH, ISimpleNetworkPayload>;
    simpleNetworkPost: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.POST, ISimpleNetworkPayload>;
    simpleNetworkPut: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.PUT, ISimpleNetworkPayload>;
    simpleNetworkSuccess: (data: any) => IAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkPayload>;
}
export declare const dispatchSimpleNetwork: IDispatchSimpleNetwork;
export declare function watchSimpleNetworkSagas(): IterableIterator<AllEffect>;
export declare function SimpleNetworkReducer(state: any, action: IAction<SIMPLENETWORK, {}>): any;
export interface ISimpleNetworkTagResponse {
    data: any | null;
    error: any | null;
}
export interface ISimpleNetworkState extends IDefaultState {
    tags: {
        [tag: string]: ISimpleNetworkTagResponse;
    };
}
export declare const simpleNetworkState: <T extends {
    simpleNetwork: ISimpleNetworkState;
}>(state: T) => ISimpleNetworkState;
export declare const simpleNetworkSelector: OutputSelector<{}, any, (res: ISimpleNetworkState) => any>;
export declare const simpleNetworkResponse: ParametricSelector<{}, string, ISimpleNetworkTagResponse>;
