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
export const onClickFnCall = (callFn: any, ...args: any) => (event: any) => {
  callFn(...args)
}

/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <InputGroup onChange={onChangeFnCall(props.simpleMerge, "FormInputTag")}
 * ```
 */
export const onChangeFnCall = (callFn: any, ...args: any) => (event: any) => {
  callFn(...args, event.target.value)
}

/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <Checkbox onChange={onChangeToggleFnCall(props.simpleMergeToggle, "FormToggleTag", props.simpleRedux)}
 * ```
 */
export const onChangeToggleFnCall = (callFn: any, ...args: any) => (
  event: any
) => {
  callFn(...args, event.target.value)
}

/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <NumberInput onChange={onChangeNumberFnCall(props.simpleMergeNumber, "FormNumberTag")}
 * ```
 */
export const onChangeNumberFnCall = (callFn: any, ...args: any) => (
  valueAsNumber: number,
  valueAsString: string
) => {
  callFn(...args, valueAsNumber, valueAsString)
}

/**
 * @param callFn: function to be called
 * @param args: arguments to be passed into the callFn
 *
 * ```
 * <TagInput onChange={onChangeTagFnCall(props.simpleMerge, "FormTagsTag")}
 * ```
 */
export const onChangeTagFnCall = (callFn: any, ...args: any) => (
  values: string[]
) => {
  callFn(...args, values)
}
