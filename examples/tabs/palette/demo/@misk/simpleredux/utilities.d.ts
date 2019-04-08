export interface IDefaultState {
    data: any;
    error: any;
    loading: boolean;
    success: boolean;
}
export interface IRootState {
    simpleTag: string;
}
export interface IDefaultRootState extends IDefaultState, IRootState {
}
export declare const defaultState: any;
export declare const defaultRootState: (simpleTag: string) => any;
export interface IAction<T, P> {
    readonly type: T;
    readonly payload?: P;
}
export declare function createAction<T extends string, P>(type: T, payload: P): IAction<T, P>;
export declare const errorMessage: (error: any) => any;
export declare const simpleRootSelector: <IState extends {
    [key: string]: any;
}, ISubState extends {
    toJS: () => IRootState;
}>(domain: string, state: IState) => any;
export declare const enum simpleType {
    array = 0,
    boolean = 1,
    number = 2,
    object = 3,
    string = 4,
    tags = 5
}
export declare const simpleSelect: <IState extends {
    [key: string]: any;
}, ISubState extends {
    [key: string]: any;
}, ISubPayload extends {
    [key: string]: any;
}>(subState: any, tagFilter: string, tagKeysFilter?: string | ((key: any) => boolean), returnType?: simpleType, subStateSelector?: any) => any;
export declare const onClickFnCall: (callFn: any, ...args: any) => (event: any) => void;
export declare const onChangeFnCall: (callFn: any, ...args: any) => (event: any) => void;
export declare const onChangeToggleFnCall: (callFn: any, ...args: any) => (event: any) => void;
export declare const onChangeNumberFnCall: (callFn: any, ...args: any) => (valueAsNumber: number, valueAsString: string) => void;
export declare const onChangeTagFnCall: (callFn: any, ...args: any) => (values: string[]) => void;
export declare const booleanToggle: (oldState: string | boolean) => boolean;
export declare const getFirstTag: <T = {
    [key: string]: any;
}>(payload: {
    [key: string]: T;
}) => T;
export declare const jsonOrString: (json: string) => any;
