import { AxiosRequestConfig } from "axios";
import { AllEffect } from "redux-saga/effects";
import { IAction, IDefaultState, IRootState } from "./utilities";
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
export interface ISimpleNetworkPayloadTag extends IDefaultState {
    requestConfig: AxiosRequestConfig;
    tag: string;
    url: string;
}
export interface ISimpleNetworkPayload {
    [tag: string]: ISimpleNetworkPayloadTag;
}
export interface IDispatchSimpleNetwork {
    simpleNetworkDelete: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.DELETE, ISimpleNetworkPayload>;
    simpleNetworkFailure: (tag: string, url: string, error: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.FAILURE, ISimpleNetworkPayload>;
    simpleNetworkGet: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.GET, ISimpleNetworkPayload>;
    simpleNetworkHead: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.HEAD, ISimpleNetworkPayload>;
    simpleNetworkPatch: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.PATCH, ISimpleNetworkPayload>;
    simpleNetworkPost: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.POST, ISimpleNetworkPayload>;
    simpleNetworkPut: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.PUT, ISimpleNetworkPayload>;
    simpleNetworkSuccess: (tag: string, url: string, error: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkPayload>;
}
export declare const dispatchSimpleNetwork: IDispatchSimpleNetwork;
export declare function watchSimpleNetworkSagas(): IterableIterator<AllEffect>;
export declare function SimpleNetworkReducer(state: any, action: IAction<SIMPLENETWORK, {}>): any;
export interface ISimpleNetworkState extends IRootState {
    [tag: string]: any | ISimpleNetworkPayload;
}
export interface ISimpleNetworkImmutableState {
    toJS: () => ISimpleNetworkState;
}
