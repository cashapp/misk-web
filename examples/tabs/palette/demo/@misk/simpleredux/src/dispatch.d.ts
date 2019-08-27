import { AxiosResponse, AxiosRequestConfig } from "axios";
import { IDefaultState, IAction } from "./utilities";
import { SIMPLEFORM, SIMPLENETWORK } from "./action";
export interface ISimpleNetworkPayloadTag extends IDefaultState, AxiosResponse {
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
    simpleNetworkSuccess: (tag: string, url: string, response: AxiosResponse, requestConfig?: AxiosRequestConfig) => IAction<SIMPLENETWORK.SUCCESS, ISimpleNetworkPayload>;
}
export declare const dispatchSimpleNetwork: IDispatchSimpleNetwork;
export interface ISimpleFormPayloadTag extends IDefaultState {
    oldToggle?: string | boolean;
    tag: string;
    valueAsString?: string;
    valueAsNumber?: number;
}
export interface ISimpleFormPayload {
    [tag: string]: ISimpleFormPayloadTag;
}
export interface IDispatchSimpleForm {
    simpleFormFailure: (tag: string, error: any) => IAction<SIMPLEFORM.FAILURE, ISimpleFormPayload>;
    simpleFormInput: (tag: string, data: any) => IAction<SIMPLEFORM.INPUT, ISimpleFormPayload>;
    simpleFormNumber: (tag: string, valueAsNumber: number, valueAsString: string) => IAction<SIMPLEFORM.NUMBER, ISimpleFormPayload>;
    simpleFormSuccess: (tag: string, data: any) => IAction<SIMPLEFORM.SUCCESS, ISimpleFormPayload>;
    simpleFormToggle: (tag: string, oldState: any) => IAction<SIMPLEFORM.TOGGLE, ISimpleFormPayload>;
}
export declare const dispatchSimpleForm: IDispatchSimpleForm;
