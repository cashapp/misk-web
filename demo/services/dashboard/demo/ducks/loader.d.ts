import { IAction, IDashboardTab, IDefaultState, IServiceMetadata } from "@misk/common";
import { AllEffect } from "redux-saga/effects";
export declare enum LOADER {
    FAILURE = "LOADER_FAILURE",
    GET_ALL_TABS = "LOADER_GET_ALL_TABS",
    GET_ONE_COMPONENT = "LOADER_GET_ONE_COMPONENT",
    GET_SERVICE_METADATA = "LOADER_GET_SERVICE_METADATA",
    SUCCESS = "LOADER_SUCCESS"
}
export declare const dispatchLoader: {
    failure: (error: any) => IAction<LOADER.FAILURE, any>;
    getAllTabs: (url: string) => IAction<LOADER.GET_ALL_TABS, {
        url: string;
        loading: boolean;
        success: boolean;
        error: any;
    }>;
    getOneComponent: (tab: IDashboardTab) => IAction<LOADER.GET_ONE_COMPONENT, {
        tab: IDashboardTab;
        loading: boolean;
        success: boolean;
        error: any;
    }>;
    getServiceMetadata: (url: string) => IAction<LOADER.GET_SERVICE_METADATA, {
        url: string;
        loading: boolean;
        success: boolean;
        error: any;
    }>;
    success: (data: any) => IAction<LOADER.SUCCESS, any>;
};
/**
 * Reducer
 * @param state
 * @param action
 */
export interface ILoaderState extends IDefaultState {
    adminTabComponents: {
        [tab: string]: string;
    };
    adminDashboardTabs: IDashboardTab[];
    serviceMetadata: IServiceMetadata;
}
export default function loaderReducer(state: any, action: IAction<string, {}>): any;
export declare function watchLoaderSagas(): IterableIterator<AllEffect>;
