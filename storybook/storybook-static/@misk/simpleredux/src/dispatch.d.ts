import { AxiosResponse, AxiosRequestConfig } from "axios";
import { SIMPLEREDUX } from "./action";
import { IAction, IDefaultState } from "./utilities";
/**
 * Configurable options for each Dispatch function
 * @param failureSaga: optional saga to run after the handled failure action to yield more actions
 * @param mergeSaga: optional saga to run after the handled merge action to yield more actions
 * @param requestConfig: [AxiosRequestConfig] to configure the Axios request
 */
export interface IDispatchOptions {
    failureSaga?: (action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) => void;
    mergeSaga?: (action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) => void;
    requestConfig?: AxiosRequestConfig;
}
interface IDispatchDefault {
    data: any;
    error: any;
    options?: IDispatchOptions;
}
export declare const dispatchDefault: IDispatchDefault;
export interface ISimpleCachePayloadTag extends IDefaultState {
    oldToggle?: string | boolean;
    tag: string;
    valueAsString?: string;
    valueAsNumber?: number;
}
export interface ISimpleHttpPayloadTag extends IDefaultState, AxiosResponse {
    options?: IDispatchOptions;
    tag: string;
    url: string;
}
export declare type ISimpleReduxPayloadTag = ISimpleCachePayloadTag | ISimpleHttpPayloadTag;
export interface ISimpleReduxPayload {
    [tag: string]: ISimpleReduxPayloadTag;
}
export interface IDispatchSimpleRedux {
    /**
     * Dispatch state merge action, overwrites state for a specific tag
     * @param tag string to identify domain of state
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     * @param data new data that overwrites fields in state[tag]
     */
    simpleMerge: (tag: string, data: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    /**
     * Dispatch state merge action, overwrites entire state
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     * @param data new data that overwrites any fields in state
     */
    simpleMergeRaw: (data: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.MERGE, any>;
    /**
     * Dispatch state merge action, overwrites state for a specific tag
     * @param tag string to identify domain of state
     * @param data new data that overwrites fields in state[tag].data
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     */
    simpleMergeData: (tag: string, data: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    /**
     * Dispatch state merge action, overwrites state for a specific tag
     * @param tag string to identify domain of state
     * @param oldState old SimpleRedux state, in order to lookup current value of tag
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     */
    simpleMergeToggle: (tag: string, oldState: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    /**
     * Dispatch HTTP Delete action, returns response/failure to a specific tag
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     */
    simpleHttpDelete: (tag: string, url: string, options?: IDispatchOptions) => IAction<SIMPLEREDUX.HTTP_DELETE, ISimpleReduxPayload>;
    /**
     * Dispatch HTTP Get action, returns response/failure to a specific tag
     * @param tag string to identify domain of state
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     * @param url HTTP endpoint to make the request
     */
    simpleHttpGet: (tag: string, url: string, options?: IDispatchOptions) => IAction<SIMPLEREDUX.HTTP_GET, ISimpleReduxPayload>;
    /**
     * Dispatch HTTP Head action, returns response/failure to a specific tag
     * @param tag string to identify domain of state
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     * @param url HTTP endpoint to make the request
     */
    simpleHttpHead: (tag: string, url: string, options?: IDispatchOptions) => IAction<SIMPLEREDUX.HTTP_HEAD, ISimpleReduxPayload>;
    /**
     * Dispatch HTTP Patch action, returns response/failure to a specific tag
     * @param tag string to identify domain of state
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     * @param url HTTP endpoint to make the request
     * @param data data to include in request body
     */
    simpleHttpPatch: (tag: string, url: string, data: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.HTTP_PATCH, ISimpleReduxPayload>;
    /**
     * Dispatch HTTP Post action, returns response/failure to a specific tag
     * @param tag string to identify domain of state
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     * @param url HTTP endpoint to make the request
     * @param data data to include in request body
     */
    simpleHttpPost: (tag: string, url: string, data: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.HTTP_POST, ISimpleReduxPayload>;
    /**
     * Dispatch HTTP Put action, returns response/failure to a specific tag
     * @param tag string to identify domain of state
     * @param options configure the dispatch with optional failureSaga, mergeSaga, or requestConfig
     * @param url HTTP endpoint to make the request
     * @param data data to include in request body
     */
    simpleHttpPut: (tag: string, url: string, data: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.HTTP_PUT, ISimpleReduxPayload>;
}
interface IPrivateDispatchSimpleRedux extends IDispatchSimpleRedux {
    /**
     * Dispatch failure action, usually for error encountered in Redux saga
     * @param tag string to identify domain of state
     * @param error object with error fields
     */
    simpleFailure: (tag: string, error: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>;
}
/**
 * SimpleRedux Dispatch Object
 * * Comprised of functions that dispatch Actions with standard defaults and any required passed in input
 * * dispatchSimpleRedux Object is used in any Redux connected component to initiate Redux Saga provided functionality
 */
export declare const dispatchSimpleRedux: IDispatchSimpleRedux;
export declare const privateDispatchSimpleRedux: IPrivateDispatchSimpleRedux;
export {};
