import { SIMPLEREDUX } from "../action";
import { IDispatchOptions, ISimpleReduxPayload } from "../dispatch";
import { IAction } from "../utilities";
import { IDispatchSimpleRedux } from "src";
/**
 * Handler functions to make provide event handlers for components in props
 *
 * <InputGroup onChange={props.handleSimpleMergeData("my-tag", options)} />
 *
 * Note:
 * - Options and overrideData values are optional
 * - Data will get implicitly passed in by extracting out event.target.value from
 *   the component
 */
export interface IHandler {
    /**
     * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMerge
     * @param tag string to identify domain of state
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideData? new data that overwrites fields in state[tag]
     */
    handleSimpleMerge: (connectedProps: IDispatchSimpleRedux, tag: string, options?: IDispatchOptions, overrideData?: any) => (event: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    /**
     * Handle onClick or onChange event to dispatch state merge action, overwrites entire state
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeRaw
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideData? new data that overwrites any fields in state
     */
    handleSimpleMergeRaw: (connectedProps: IDispatchSimpleRedux, options?: IDispatchOptions, overrideData?: any) => (event: any) => IAction<SIMPLEREDUX.MERGE, any>;
    /**
     * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeData
     * @param tag string to identify domain of state
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideData? new data that overwrites fields in state[tag].data
     */
    handleSimpleMergeData: (connectedProps: IDispatchSimpleRedux, tag: string, options?: IDispatchOptions, overrideData?: any) => (event: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    /**
     * Handle onChange event for Blueprint <Number/> component
     *   to dispatch state merge action, overwrites state for a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeNumber
     * @param tag string to identify domain of state
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideValueAsNumber? new number value as a number
     * @param overrideValueAsString? new number value as a string
     */
    handleSimpleMergeNumber: (connectedProps: IDispatchSimpleRedux, tag: string, options?: IDispatchOptions, overrideValueAsNumber?: number, overrideValueAsString?: string) => (valueAsNumber: number, valueAsString: string) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    /**
     * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeToggle
     * @param tag string to identify domain of state
     * @param oldState old SimpleRedux state, in order to lookup current value of tag
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     */
    handleSimpleMergeToggle: (connectedProps: IDispatchSimpleRedux, tag: string, oldState: any, options?: IDispatchOptions) => (event: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
    /**
     * Handle onClick or onChange event to dispatch HTTP Delete action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpDelete
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     */
    handleSimpleHttpDelete: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions) => (event: any) => IAction<SIMPLEREDUX.HTTP_DELETE, ISimpleReduxPayload>;
    /**
     * Handle onClick or onChange event to dispatch HTTP Get action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpGet
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     */
    handleSimpleHttpGet: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions) => (event: any) => IAction<SIMPLEREDUX.HTTP_GET, ISimpleReduxPayload>;
    /**
     * Handle onClick or onChange event to dispatch HTTP Head action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpHead
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     */
    handleSimpleHttpHead: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions) => (event: any) => IAction<SIMPLEREDUX.HTTP_HEAD, ISimpleReduxPayload>;
    /**
     * Handle onClick or onChange event to dispatch HTTP Patch action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPatch
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideData? data to include in request body
     */
    handleSimpleHttpPatch: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions, overrideData?: any) => (event: any) => IAction<SIMPLEREDUX.HTTP_PATCH, ISimpleReduxPayload>;
    /**
     * Handle onClick or onChange event to dispatch HTTP Post action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPost
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideData? data to include in request body
     */
    handleSimpleHttpPost: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions, overrideData?: any) => (event: any) => IAction<SIMPLEREDUX.HTTP_POST, ISimpleReduxPayload>;
    /**
     * Handle onClick or onChange event to dispatch HTTP Put action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPut
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideData? data to include in request body
     */
    handleSimpleHttpPut: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions, overrideData?: any) => (event: any) => IAction<SIMPLEREDUX.HTTP_PUT, ISimpleReduxPayload>;
}
export declare const handler: IHandler;
