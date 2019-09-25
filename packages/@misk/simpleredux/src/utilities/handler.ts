import { SIMPLEREDUX } from "../action"
import {
  IDispatchOptions,
  IDispatchSimpleRedux,
  ISimpleReduxPayload
} from "../dispatch"
import { ISimpleReduxState } from "../reducer"
import { IAction } from "../utilities"

/**
 * Handler functions to make provide event handlers for components in props
 *
 * <InputGroup onChange={handler.simpleMergeData("my-tag", options)} />
 *
 * Note:
 * - Options and overrideData values are optional
 * - Data will get implicitly passed in by extracting out event.target.value from
 *   the component
 */

export interface IHandler {
  // Lifecycle
  /**
   * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMerge
   * @param tag string to identify domain of state
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideData? new data that overwrites fields in state[tag]
   */
  simpleMerge: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>

  /**
   * Handle onClick or onChange event to dispatch state merge action, overwrites entire state
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeRaw
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideData? new data that overwrites any fields in state
   */
  simpleMergeRaw: (
    connectedProps: IDispatchSimpleRedux,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) => IAction<SIMPLEREDUX.MERGE, any>

  // Redux as UI / Field Input Cache
  /**
   * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeData
   * @param tag string to identify domain of state
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideData? new data that overwrites fields in state[tag].data
   */
  simpleMergeData: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>

  /**
   * Handle onChange event for Blueprint <Number/> component
   *   to dispatch state merge action, overwrites state for a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeNumber
   * @param tag string to identify domain of state
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideValueAsNumber? new number value as a number
   * @param overrideValueAsString? new number value as a string
   */
  simpleMergeNumber: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IDispatchOptions,
    overrideValueAsNumber?: number,
    overrideValueAsString?: string
  ) => (
    valueAsNumber: number,
    valueAsString: string
  ) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>

  /**
   * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeToggle and simpleRedux state
   * @param tag string to identify domain of state
   * @param oldState old SimpleRedux state, in order to lookup current value of tag
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   */
  simpleMergeToggle: (
    connectedProps: IDispatchSimpleRedux & { simpleRedux: ISimpleReduxState },
    tag: string,
    options?: IDispatchOptions
  ) => (event: any) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>

  // Async HTTP Network Calls

  /**
   * Handle onClick or onChange event to dispatch HTTP Delete action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpDelete
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   */
  simpleHttpDelete: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions
  ) => (event: any) => IAction<SIMPLEREDUX.HTTP_DELETE, ISimpleReduxPayload>

  /**
   * Handle onClick or onChange event to dispatch HTTP Get action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpGet
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   */
  simpleHttpGet: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions
  ) => (event: any) => IAction<SIMPLEREDUX.HTTP_GET, ISimpleReduxPayload>

  /**
   * Handle onClick or onChange event to dispatch HTTP Head action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpHead
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   */
  simpleHttpHead: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions
  ) => (event: any) => IAction<SIMPLEREDUX.HTTP_HEAD, ISimpleReduxPayload>

  /**
   * Handle onClick or onChange event to dispatch HTTP Patch action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPatch
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideData? data to include in request body
   */
  simpleHttpPatch: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) => IAction<SIMPLEREDUX.HTTP_PATCH, ISimpleReduxPayload>

  /**
   * Handle onClick or onChange event to dispatch HTTP Post action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPost
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideData? data to include in request body
   */
  simpleHttpPost: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) => IAction<SIMPLEREDUX.HTTP_POST, ISimpleReduxPayload>

  /**
   * Handle onClick or onChange event to dispatch HTTP Put action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPut
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideData? data to include in request body
   */
  simpleHttpPut: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) => IAction<SIMPLEREDUX.HTTP_PUT, ISimpleReduxPayload>
}

export const handler: IHandler = {
  simpleMerge: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) =>
    connectedProps.simpleMerge(
      tag,
      overrideData || event.target.value,
      options
    ),
  simpleMergeRaw: (
    connectedProps: IDispatchSimpleRedux,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) =>
    connectedProps.simpleMergeRaw(overrideData || event.target.value, options),
  simpleMergeData: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) =>
    connectedProps.simpleMergeData(
      tag,
      overrideData || event.target.value,
      options
    ),
  simpleMergeNumber: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IDispatchOptions,
    overrideValueAsNumber?: number,
    overrideValueAsString?: string
  ) => (valueAsNumber: number, valueAsString: string) =>
    connectedProps.simpleMergeNumber(
      tag,
      overrideValueAsNumber || valueAsNumber,
      overrideValueAsString || valueAsString,
      options
    ),
  simpleMergeToggle: (
    connectedProps: IDispatchSimpleRedux & { simpleRedux: ISimpleReduxState },
    tag: string,
    options?: IDispatchOptions
  ) => (_: any) =>
    connectedProps.simpleMergeToggle(tag, connectedProps.simpleRedux, options),
  simpleHttpDelete: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions
  ) => (_: any) => connectedProps.simpleHttpDelete(tag, url, options),
  simpleHttpGet: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions
  ) => (_: any) => connectedProps.simpleHttpGet(tag, url, options),
  simpleHttpHead: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions
  ) => (_: any) => connectedProps.simpleHttpHead(tag, url, options),
  simpleHttpPatch: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) =>
    connectedProps.simpleHttpPatch(
      tag,
      url,
      overrideData || event.target.value,
      options
    ),
  simpleHttpPost: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) =>
    connectedProps.simpleHttpPost(
      tag,
      url,
      overrideData || event.target.value,
      options
    ),
  simpleHttpPut: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IDispatchOptions,
    overrideData?: any
  ) => (event: any) =>
    connectedProps.simpleHttpPut(
      tag,
      url,
      overrideData || event.target.value,
      options
    )
}
