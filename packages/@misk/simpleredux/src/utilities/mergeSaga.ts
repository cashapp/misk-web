import { get } from "lodash"
import { SIMPLEREDUX } from "../action"
import {
  dispatchDefault,
  IDispatchOptions,
  IDispatchSimpleRedux,
  ISimpleReduxPayload
} from "../dispatch"
import { IAction } from "../utilities"

/**
 * Factories for IDispatchOptions optional mergeSaga
 */

/**
 * Loops over data from payload path and saves to tag in Redux
 *
 * @param connectedProps: Redux connected props with dispatchSimpleRedux.simpleMergeData
 * @param payloadPath: path inside of incoming Redux action payload to look to start iterating over payload keys that will be expanded to separate Redux tags
 * @param keyTagLookup: object that maps from action payload keys to the new Redux tags
 * @param options configure the dispatch with optional mergeSaga or requestConfig
 */
export const mergeSagaMapKeysToTags = (
  connectedProps: { simpleMergeData: IDispatchSimpleRedux["simpleMergeData"] },
  payloadPath: string | string[],
  keyTagLookup: { [key: string]: string },
  options: IDispatchOptions = dispatchDefault.options
) =>
  function*(action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) {
    const { payload } = action
    for (const key in get(payload, payloadPath)) {
      yield connectedProps.simpleMergeData(
        keyTagLookup[key],
        payload.data.data[key],
        options
      )
    }
  }
