import { IDispatchOptions, IAction, SIMPLEREDUX, ISimpleReduxPayload } from "@misk/simpleredux";
export declare const failureSagaMapKeysToTags: (connectedProps: {
    simpleMergeData: (tag: string, data: any, options?: IDispatchOptions) => IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>;
}, keyTagLookup: {
    [key: string]: string;
}, options?: IDispatchOptions) => (action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) => IterableIterator<IAction<SIMPLEREDUX.MERGE, ISimpleReduxPayload>>;
export declare const ExampleMergeSagaContainer: (props: any) => JSX.Element;
declare const _default;
export default _default;
