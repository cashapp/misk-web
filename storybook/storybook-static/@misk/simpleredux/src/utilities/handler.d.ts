import { IDispatchOptions, IDispatchSimpleRedux } from "../dispatch";
import { ISimpleReduxState } from "../reducer";
/**
 * Handler functions to make provide event handlers for components in props
 *
 * <InputGroup onChange={handler.simpleMergeData("my-tag", options)} />
 *
 * Note:
 * - Options and ...options.overrideArgs values are optional
 * - Data will get implicitly passed in by extracting out parseEventInput(...onChangeArgs) from
 *   the component
 */
/**
 * IHandlerOptions extends IDispatchOptions by adding an overrideArgs field that,
 * if present, is used instead of the onChange event provided args
 */
export interface IHandlerOptions extends IDispatchOptions {
    overrideArgs?: any;
}
/** Don't persist raw React events thinking they are deliberate objects */
export declare const isSyntheticEvent: (obj: any) => boolean;
/**
 * Provides normalized handling of component onChange varied inputs
 * @param args array of any event input from a component onChange function
 */
export declare const parseOnChangeArgs: (args: any) => any;
export interface IHandler {
    /**
     * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMerge
     * @param tag string to identify domain of state
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideArgs? vararg to override any component onChange args
     */
    simpleMerge: (connectedProps: IDispatchSimpleRedux, tag: string, options?: IHandlerOptions) => (...onChangeArgs: any) => void;
    /**
     * Handle onClick or onChange event to dispatch state merge action, overwrites entire state
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeRaw
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideArgs? vararg to override any component onChange args
     */
    simpleMergeRaw: (connectedProps: IDispatchSimpleRedux, options?: IHandlerOptions) => (...onChangeArgs: any) => void;
    /**
     * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeData
     * @param tag string to identify domain of state
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideArgs? vararg to override any component onChange args
     */
    simpleMergeData: (connectedProps: IDispatchSimpleRedux, tag: string, options?: IHandlerOptions) => (...onChangeArgs: any[]) => void;
    /**
     * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeToggle and simpleRedux state
     * @param tag string to identify domain of state
     * @param oldState old SimpleRedux state, in order to lookup current value of tag
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     */
    simpleMergeToggle: (connectedProps: IDispatchSimpleRedux & {
        simpleRedux: ISimpleReduxState;
    }, tag: string, options?: IDispatchOptions) => (...onChangeArgs: any) => void;
    /**
     * Handle onClick or onChange event to dispatch HTTP Delete action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpDelete
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     */
    simpleHttpDelete: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions) => (...onChangeArgs: any) => void;
    /**
     * Handle onClick or onChange event to dispatch HTTP Get action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpGet
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     */
    simpleHttpGet: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions) => (...onChangeArgs: any) => void;
    /**
     * Handle onClick or onChange event to dispatch HTTP Head action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpHead
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     */
    simpleHttpHead: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IDispatchOptions) => (...onChangeArgs: any) => void;
    /**
     * Handle onClick or onChange event to dispatch HTTP Patch action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPatch
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideArgs? vararg to override any component onChange args to be sent as request body
     */
    simpleHttpPatch: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IHandlerOptions) => (...onChangeArgs: any) => void;
    /**
     * Handle onClick or onChange event to dispatch HTTP Post action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPost
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideArgs? vararg to override any component onChange args to be sent as request body
     */
    simpleHttpPost: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IHandlerOptions) => (...onChangeArgs: any) => void;
    /**
     * Handle onClick or onChange event to dispatch HTTP Put action, returns response/failure to a specific tag
     * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPut
     * @param tag string to identify domain of state
     * @param url HTTP endpoint to make the request
     * @param options? configure the dispatch with optional mergeSaga or requestConfig
     * @param overrideArgs? vararg to override any component onChange args to be sent as request body
     */
    simpleHttpPut: (connectedProps: IDispatchSimpleRedux, tag: string, url: string, options?: IHandlerOptions) => (...onChangeArgs: any) => void;
}
export declare const handler: IHandler;
