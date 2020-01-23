import get from "lodash/get"
import { IDispatchOptions, IDispatchSimpleRedux } from "../dispatch"
import { ISimpleReduxState } from "../reducer"

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
  overrideArgs?: any
}

/** Don't persist raw React events thinking they are deliberate objects */
export const isSyntheticEvent = (obj: any): boolean => {
  if (
    typeof obj === "object" &&
    "nativeEvent" in obj &&
    "currentTarget" in obj &&
    "target" in obj &&
    "bubbles" in obj &&
    "cancelable" in obj &&
    "defaultPrevented" in obj &&
    "eventPhase" in obj &&
    "isTrusted" in obj &&
    "preventDefault" in obj &&
    "isDefaultPrevented" in obj &&
    "stopPropagation" in obj &&
    "isPropagationStopped" in obj &&
    "persist" in obj &&
    "timeStamp" in obj &&
    "type" in obj
  ) {
    return true
  } else {
    return false
  }
}

/**
 * Provides normalized handling of component onChange varied inputs
 * @param args array of any event input from a component onChange function
 */
export const parseOnChangeArgs = (args: any) => {
  if (args[0] && args[0].target && args[0].target.value) {
    // onChange=(event: [{ target: { value: any } }] ) => ... }
    return args[0].target.value
  } else if (args && args.target && args.target.value) {
    // onChange={(value: number) => ... }
    return args.target.value
  } else if (
    args.length === 2 &&
    typeof args[0] === "number" &&
    typeof args[1] === "string"
  ) {
    // onChange={(valueAsNumber: number, valueAsString: string) => ... }
    return args[1]
  } else if (
    args.length === 2 &&
    args[0] instanceof Date &&
    typeof args[1] === "boolean"
  ) {
    // onChange={(selectedDate: Date, isUserChange: boolean) => ... }
    // We just want the Date, we don't really care how we got it.
    return args[0]
  } else if (args.length === 1 && !isSyntheticEvent(args[0])) {
    // overrideArgs
    return args[0]
  } else if (args.length > 1) {
    // args are an array
    return args
  } else if (
    typeof args === "object" ||
    typeof args === "number" ||
    typeof args === "string"
  ) {
    // args are an object, number, or string
    return args
  } else {
    return null
  }
}

export interface IHandler {
  // Lifecycle
  /**
   * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMerge
   * @param tag string to identify domain of state
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideArgs? vararg to override any component onChange args
   */
  simpleMerge: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) => void

  /**
   * Handle onClick or onChange event to dispatch state merge action, overwrites entire state
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeRaw
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideArgs? vararg to override any component onChange args
   */
  simpleMergeRaw: (
    connectedProps: IDispatchSimpleRedux,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) => void

  // Redux as UI / Field Input Cache
  /**
   * Handle onClick or onChange event to dispatch state merge action, overwrites state for a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleMergeData
   * @param tag string to identify domain of state
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideArgs? vararg to override any component onChange args
   */
  simpleMergeData: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any[]) => void

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
  ) => (...onChangeArgs: any) => void

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
  ) => (...onChangeArgs: any) => void

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
  ) => (...onChangeArgs: any) => void

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
  ) => (...onChangeArgs: any) => void

  /**
   * Handle onClick or onChange event to dispatch HTTP Patch action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPatch
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideArgs? vararg to override any component onChange args to be sent as request body
   */
  simpleHttpPatch: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) => void

  /**
   * Handle onClick or onChange event to dispatch HTTP Post action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPost
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideArgs? vararg to override any component onChange args to be sent as request body
   */
  simpleHttpPost: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) => void

  /**
   * Handle onClick or onChange event to dispatch HTTP Put action, returns response/failure to a specific tag
   * @param connectedProps Redux connected props that contain dispatchSimpleRedux.simpleHttpPut
   * @param tag string to identify domain of state
   * @param url HTTP endpoint to make the request
   * @param options? configure the dispatch with optional mergeSaga or requestConfig
   * @param overrideArgs? vararg to override any component onChange args to be sent as request body
   */
  simpleHttpPut: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) => void
}

export const handler: IHandler = {
  simpleMerge: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) =>
    connectedProps.simpleMerge(
      tag,
      parseOnChangeArgs(get(options, "overrideArgs", onChangeArgs)),
      options
    ),
  simpleMergeRaw: (
    connectedProps: IDispatchSimpleRedux,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) =>
    connectedProps.simpleMergeRaw(
      parseOnChangeArgs(get(options, "overrideArgs", onChangeArgs)),
      options
    ),
  simpleMergeData: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) =>
    connectedProps.simpleMergeData(
      tag,
      parseOnChangeArgs(get(options, "overrideArgs", onChangeArgs)),
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
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) =>
    connectedProps.simpleHttpPatch(
      tag,
      url,
      parseOnChangeArgs(get(options, "overrideArgs", onChangeArgs)),
      options
    ),
  simpleHttpPost: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) =>
    connectedProps.simpleHttpPost(
      tag,
      url,
      parseOnChangeArgs(get(options, "overrideArgs", onChangeArgs)),
      options
    ),
  simpleHttpPut: (
    connectedProps: IDispatchSimpleRedux,
    tag: string,
    url: string,
    options?: IHandlerOptions
  ) => (...onChangeArgs: any) =>
    connectedProps.simpleHttpPut(
      tag,
      url,
      parseOnChangeArgs(get(options, "overrideArgs", onChangeArgs)),
      options
    )
}
