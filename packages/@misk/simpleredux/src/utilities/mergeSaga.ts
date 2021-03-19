import { get } from "lodash"
import { SIMPLEREDUX } from "../action"
import {
  dispatchDefault,
  IDispatchOptions,
  IDispatchSimpleRedux,
  ISimpleReduxPayload,
  ISimpleReduxPayloadTag,
} from "../dispatch"
import { IAction, getFirstTag } from "../utilities"

/**
 * Factories for IDispatchOptions optional mergeSaga
 */

/**
 * Loops over data from payload path and saves to tag in Redux
 *
 * @param connectedProps: Redux connected props with dispatchSimpleRedux.simpleMergeData
 * @param payloadPath: path inside of incoming Redux action payload to
 * look to start iterating over payload keys that will be expanded to
 * separate Redux tags
 *
 * Example
 * ```ts
 * const action = {
 *   payload: {
 *     AlphaTag: {
 *       data: {
 *          delta: [1,2,3],
 *          echo: [4,5,6]
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * Note that the initial calling tag will have been "AlphaTag" but to keep
 * sagas generic, we use `getFirstTag` to pull the tagged object out of
 * payload.
 *
 * Thus for this example, the `payloadPath` is just "data".
 *
 * @param keyTagLookup: object that maps from action payload keys to the new Redux tags
 * @param options configure the dispatch with optional mergeSaga or requestConfig
 */
export const mergeSagaMapKeysToTags = (
  connectedProps: { simpleMergeData: IDispatchSimpleRedux["simpleMergeData"] },
  payloadPath: string | string[],
  keyTagLookup: { [key: string]: string },
  options: IDispatchOptions = dispatchDefault.options
) =>
  function* (action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) {
    const payload = getFirstTag<ISimpleReduxPayloadTag>(action.payload)
    for (const key in get(payload, payloadPath)) {
      const tag = keyTagLookup[key]
      const payloadPathKey =
        typeof payloadPath === "string"
          ? payloadPath + `.${key}`
          : [].concat(payloadPath).concat([key])
      const value = get(payload, payloadPathKey)
      yield connectedProps.simpleMergeData(tag, value, options)
    }
  }
