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
 * New way: Use on{Click,Change,Toggle,Number,ChangeTag}FnCall to wrap and implicitly pass into handling functions the input events
 * ```
 * <InputGroup onChange={onChangeFnCall(props.simpleFormInput, "FormInputTag")}
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleFormNumber, "FormNumberTag")}
 * ```
 */
/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Button onClick={onClickFnCall(props.simpleHttpPut, "PutTag", { ...requestBody })}
 * ```
 */
export declare const onClickFnCall: (callFn: any, ...args: any) => (event: any) => void;
/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <InputGroup onChange={onChangeFnCall(props.simpleMerge, "FormInputTag")}
 * ```
 */
export declare const onChangeFnCall: (callFn: any, ...args: any) => (event: any) => void;
/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Checkbox onChange={onChangeToggleFnCall(props.simpleMergeToggle, "FormToggleTag", props.simpleRedux)}
 * ```
 */
export declare const onChangeToggleFnCall: (callFn: any, ...args: any) => (event: any) => void;
/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleMergeNumber, "FormNumberTag")}
 * ```
 */
export declare const onChangeNumberFnCall: (callFn: any, ...args: any) => (valueAsNumber: number, valueAsString: string) => void;
/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <TagInput onChange={onChangeTagFnCall(props.simpleMerge, "FormTagsTag")}
 * ```
 */
export declare const onChangeTagFnCall: (callFn: any, ...args: any) => (values: string[]) => void;
