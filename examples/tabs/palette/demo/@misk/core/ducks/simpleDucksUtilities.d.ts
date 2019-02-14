export declare const onClickFnCall: (callFn: any, args: any[]) => (event: any) => void;
export declare const onChangeFnCall: (callFn: any, args: any[]) => (event: any) => void;
export declare const onChangeToggleFnCall: (callFn: any, args: any[]) => (event: any) => void;
export declare const onChangeNumberFnCall: (callFn: any, args: any[]) => (valueAsNumber: number, valueAsString: string) => void;
export declare const onChangeTagFnCall: (callFn: any, args: any[]) => (values: string[]) => void;
export declare const booleanToggle: (oldState: string | boolean) => boolean;
export declare const getPayloadTag: <T = any>(payload: {
    [tag: string]: T;
}) => T;
export declare const jsonOrString: (json: string) => any;
