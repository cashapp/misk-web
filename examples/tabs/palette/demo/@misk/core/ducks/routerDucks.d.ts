import { IAction, IDefaultState } from "@misk/common";
import { AxiosRequestConfig } from "axios";
import { AllEffect } from "redux-saga/effects";
export declare enum ROUTER {
    DELETE = "SIMPLENETWORK_DELETE",
    FAILURE = "SIMPLENETWORK_FAILURE",
    GET = "SIMPLENETWORK_GET",
    PATCH = "SIMPLENETWORK_PATCH",
    POST = "SIMPLENETWORK_POST",
    PUT = "SIMPLENETWORK_PUT",
    SUCCESS = "SIMPLENETWORK_SUCCESS"
}
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
export declare function watchRouterSagas(): IterableIterator<AllEffect>;
export declare function RouterReducer(state: any, action: IAction<ROUTER, {}>): any;
export interface IRouterState extends IDefaultState {
    tags: {
        [tag: string]: {
            data: any | null;
            error: any | null;
        };
    };
}
