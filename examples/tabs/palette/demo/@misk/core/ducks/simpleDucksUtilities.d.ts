/**
 * simple*Ducks libraries common code
 */
/**
 * Handler Functions
 * Reduce the legwork of parsing `onChange`, `onClick` and other events in Buttons, Inputs, Toggles...etc to call your handling function
 *
 * Old Way: Manually declare inline arrow funtions consuming the input events
 * ```
 * <InputGroup onChange={(event: any) => (props.simpleFormInput("FormInputTag", event.target.value))}
 * <NumberInput onChange={({valueAsNumber: number, valueAsString: string}) => (props.simpleFormNumber("FormNumberTag", valueAsNumber, valueAsString))}
 * ```
 *
 * New way: Use on*FnCall to wrap and implicitly pass into handling functions the input events
 * ```
 * <InputGroup onChange={onChangeFnCall(props.simpleFormInput, ["FormInputTag"])}
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleFormNumber, ["FormNumberTag"])}
 * ```
 */
/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Button onClick={onClickFnCall(props.simpleNetworkPut, ["PutTag", { ...requestBody }])}
 * ```
 */
export declare const onClickFnCall: (callFn: any, args: any[]) => (event: any) => void;
/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <InputGroup onChange={onChangeFnCall(props.simpleFormInput, ["FormInputTag"])}
 * ```
 */
export declare const onChangeFnCall: (callFn: any, args: any[]) => (event: any) => void;
/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Checkbox onChange={onChangeToggleFnCall(props.simpleFormToggle, ["FormToggleTag", simpleFormState])}
 * ```
 */
export declare const onChangeToggleFnCall: (callFn: any, args: any[]) => (event: any) => void;
/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleFormNumber, ["FormNumberTag"])}
 * ```
 */
export declare const onChangeNumberFnCall: (callFn: any, args: any[]) => (valueAsNumber: number, valueAsString: string) => void;
/**
 *
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <TagInput onChange={onChangeTagFnCall(props.simpleFormInput, ["FormTagsTag"])}
 * ```
 */
export declare const onChangeTagFnCall: (callFn: any, args: any[]) => (values: string[]) => void;
/**
 * Utilities
 */
/**
 * @param oldState input from the event.target.value of a button (string)
 *                 or the oldState from Redux store (boolean)
 */
export declare const booleanToggle: (oldState: string | boolean) => boolean;
/**
 * @param payload `action.payload` from Redux
 * Assumes that the first non-order safe key accessed is the data
 * Only use when action.payload has a single key (ie. the tag with all metadata inside)
 * Otherwise, unpredictable key selection
 */
export declare const getPayloadTag: <T = any>(payload: {
    [tag: string]: T;
}) => T;
/**
 *
 * @param json likely JSON input as a string
 * @returns JSON or string if JSON.parse fails
 */
export declare const jsonOrString: (json: string) => any;
