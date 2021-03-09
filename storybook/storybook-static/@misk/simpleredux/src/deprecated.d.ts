import { AxiosResponse, AxiosRequestConfig } from "axios";
import { SIMPLEREDUX } from "./action";
import { ISimpleReduxPayload } from "./dispatch";
import { SimpleReduxReducer } from "./reducer";
import { watchSimpleReduxSagas } from "./saga";
import { IAction, IRootState } from "./utilities";
/** DEPRECATED: Use [dispatchSimpleRedux] instead */
export interface IDispatchSimpleNetwork {
    simpleNetworkDelete: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLEREDUX.HTTP_DELETE, ISimpleReduxPayload>;
    simpleNetworkFailure: (tag: string, url: string, error: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>;
    simpleNetworkGet: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLEREDUX.HTTP_GET, ISimpleReduxPayload>;
    simpleNetworkHead: (tag: string, url: string, requestConfig?: AxiosRequestConfig) => IAction<SIMPLEREDUX.HTTP_HEAD, ISimpleReduxPayload>;
    simpleNetworkPatch: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLEREDUX.HTTP_PATCH, ISimpleReduxPayload>;
    simpleNetworkPost: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLEREDUX.HTTP_POST, ISimpleReduxPayload>;
    simpleNetworkPut: (tag: string, url: string, data: any, requestConfig?: AxiosRequestConfig) => IAction<SIMPLEREDUX.HTTP_PUT, ISimpleReduxPayload>;
    simpleNetworkSuccess: (tag: string, url: string, response: AxiosResponse, requestConfig?: AxiosRequestConfig) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
}
/** DEPRECATED: Use [dispatchSimpleRedux] instead */
export declare const dispatchSimpleNetwork: IDispatchSimpleNetwork;
/** DEPRECATED: Use [dispatchSimpleRedux] instead */
export interface IDispatchSimpleForm {
    simpleFormFailure: (tag: string, error: any) => IAction<SIMPLEREDUX.FAILURE, ISimpleReduxPayload>;
    simpleFormInput: (tag: string, data: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    simpleFormNumber: (tag: string, valueAsNumber: number, valueAsString: string) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    simpleFormSuccess: (tag: string, data: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    simpleFormToggle: (tag: string, oldState: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
}
/** DEPRECATED: Use [dispatchSimpleRedux] instead */
export declare const dispatchSimpleForm: IDispatchSimpleForm;
/** DEPRECATED: Use [SimpleReduxReducer] instead */
export declare const SimpleNetworkReducer: typeof SimpleReduxReducer;
/** DEPRECATED: Use [ISimpleReduxState] instead */
export interface ISimpleNetworkState extends IRootState {
    [tag: string]: any | ISimpleReduxPayload;
}
/** DEPRECATED: Use [ISimpleReduxImmutableState] instead */
export interface ISimpleNetworkImmutableState {
    toJS: () => ISimpleNetworkState;
}
/** DEPRECATED: Use [SimpleReduxReducer] instead */
export declare const SimpleFormReducer: typeof SimpleReduxReducer;
/** DEPRECATED: Use [ISimpleReduxState] instead */
export interface ISimpleFormState extends IRootState {
    [tag: string]: any | ISimpleReduxPayload;
}
/** DEPRECATED: Use [ISimpleReduxImmutableState] instead */
export interface ISimpleFormImmutableState {
    toJS: () => ISimpleFormState;
}
/** DEPRECATED: Use [watchSimpleReduxSagas] instead */
export declare const watchSimpleFormSagas: typeof watchSimpleReduxSagas;
/** DEPRECATED: Use [watchSimpleReduxSagas] instead */
export declare const watchSimpleNetworkSagas: typeof watchSimpleReduxSagas;
/**
 * DEPRECATED
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Button onClick={onClickFnCall(props.simpleHttpPut, "PutTag", { ...requestBody })}
 * ```
 */
export declare const onClickFnCall: (callFn: any, ...args: any) => (event: any) => void;
/**
 * DEPRECATED
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <InputGroup onChange={onChangeFnCall(props.simpleMerge, "FormInputTag")}
 * ```
 */
export declare const onChangeFnCall: (callFn: any, ...args: any) => (event: any) => void;
/**
 * DEPRECATED
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Checkbox onChange={onChangeToggleFnCall(props.simpleMergeToggle, "FormToggleTag", props.simpleRedux)}
 * ```
 */
export declare const onChangeToggleFnCall: (callFn: any, ...args: any) => (event: any) => void;
/**
 * DEPRECATED
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleMergeNumber, "FormNumberTag")}
 * ```
 */
export declare const onChangeNumberFnCall: (callFn: any, ...args: any) => (valueAsNumber: number, valueAsString: string) => void;
/**
 * DEPRECATED
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <TagInput onChange={onChangeTagFnCall(props.simpleMerge, "FormTagsTag")}
 * ```
 */
export declare const onChangeTagFnCall: (callFn: any, ...args: any) => (values: string[]) => void;
