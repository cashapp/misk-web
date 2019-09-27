import { Map } from "immutable";
import { ParametricSelector } from "reselect";
import { IRootState } from "../utilities";
/**
 * simpleRootRawSelector is a Redux selector of a subState based on a domain string
 * @param domain
 * @param state
 *
 * Returns the raw stored object from Redux (in contrast to simpleRootSelector)
 */
export declare const simpleRootRawSelector: <IState extends Map<string, any>, ISubState>(domain: string, state: IState) => any;
/**
 * simpleRootSelector is a Redux selector of a subState based on a domain string
 * @param domain
 * @param state
 *
 * Asssumes that the substate is an ImmutableJS object and has a toJS function on the object
 */
export declare const simpleRootSelector: <IState extends {
    [key: string]: any;
}, ISubState extends {
    toJS: () => IRootState;
}>(domain: string, state: IState) => any;
/** DEPRECATED */
export declare const enum simpleType {
    array = 0,
    boolean = 1,
    number = 2,
    object = 3,
    string = 4,
    tags = 5
}
/** DEPRECATED */
export declare const simpleSelect: <IState extends {
    [key: string]: any;
}, ISubState extends {
    [key: string]: any;
}, ISubPayload extends {
    [key: string]: any;
}>(subState: any, tagFilter: string, tagKeysFilter?: string, returnType?: any, subStateSelector?: any) => any;
/**
 * Cached Redux Selector using Lodash Get API to select parts of the state
 * https://lodash.com/docs#get
 */
export declare const simpleSelectorGet: <IState extends {
    [key: string]: any;
}, ISubState extends {
    [key: string]: any;
}, ISubPayload extends {
    [key: string]: any;
}>(subState: any, path: string | string[], defaultValue?: any) => any;
export declare const createSimpleSelectorGet: <ISubState extends {
    [key: string]: any;
}, ISubPayload extends {
    [key: string]: any;
}>(subStateSelector: (state: any) => ISubState, defaultValue?: any) => ParametricSelector<ISubState, string | string[], any | ISubPayload | ISubPayload[]>;
/**
 * Cached Redux Selector using Lodash Pick API to select parts of the state
 * https://lodash.com/docs#pick
 */
export declare const simpleSelectorPick: <IState extends {
    [key: string]: any;
}, ISubState extends {
    [key: string]: any;
}, ISubPayload extends {
    [key: string]: any;
}>(subState: any, paths: string | string[]) => any;
export declare const createSimpleSelectorPick: <ISubState extends {
    [key: string]: any;
}, ISubPayload extends {
    [key: string]: any;
}>(subStateSelector: (state: any) => ISubState) => ParametricSelector<ISubState, string | String[], any | ISubPayload | ISubPayload[]>;
/**
 * Cached Redux Selector using Lodash Pick API that flattens resulting object and renames keys
 * https://lodash.com/docs#pick
 */
export declare const simpleSelectorPickTransform: <IState extends {
    [key: string]: any;
}, ISubState extends {
    [key: string]: any;
}, ISubPayload extends {
    [key: string]: any;
}>(subState: any, paths: string | string[], keyLookup: {
    [key: string]: string;
}, keyPathLookup: string | {
    [key: string]: string;
}) => any;
export declare const createSimpleSelectorPickTransform: <ISubState extends {
    [key: string]: any;
}, ISubPayload extends {
    [key: string]: any;
}>(subStateSelector: (state: any) => ISubState, keyLookup: {
    [key: string]: string;
}, keyPathLookup: {
    [key: string]: string;
} | string) => ParametricSelector<ISubState, string | String[], any | ISubPayload | ISubPayload[]>;
