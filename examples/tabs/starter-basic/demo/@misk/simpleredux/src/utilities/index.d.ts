import { History, Location } from "history";
import { match } from "react-router";
import { ForkEffectDescriptor, SimpleEffect } from "redux-saga/effects";
export * from "./handler";
export * from "./mergeSaga";
export * from "./simpleSelector";
/**
 * redux-sagas types copied manually in since they are not yet exported
 * @todo remove once https://github.com/redux-saga/redux-saga/pull/1890 is merged
 */
export interface CombinatorEffect<T, E> {
    "@@redux-saga/IO": true;
    combinator: true;
    type: T;
    payload: CombinatorEffectDescriptor<E>;
}
export declare type CombinatorEffectDescriptor<E> = {
    [key: string]: E;
} | E[];
/** Type definition for SimpleRedux root Saga: [watchSimpleReduxSagas] */
export declare type SimpleReduxSaga = IterableIterator<CombinatorEffect<"ALL", SimpleEffect<"FORK", ForkEffectDescriptor>>>;
/**
 * Default React Router Props
 * These are injected in different conditions depending on if a component is
 * rendered as part of a React Router route
 * https://reacttraining.com/react-router/web/api/location
 */
export interface IRouterProvidedProps {
    history?: History;
    location?: Location;
    match?: match;
}
/** Default State with Redux flow metadata */
export interface IDefaultState {
    data: any;
    error: any;
    loading: boolean;
    success: boolean;
}
/** simpleTag key included in SimpleRedux state to identify that it is compatible with @misk/simpleredux */
export interface IRootState {
    simpleTag: string;
}
/** Default root state that includes Redux flow metadata and simpleTag */
export interface IDefaultRootState extends IDefaultState, IRootState {
}
/** Initializes new default state with initial Redux metadata in an ImmutableJS object */
export declare const defaultState: any;
/**
 * @param simpleTag string identifier for the state domain
 * Used to initialize a top level domain of Redux state
 *
 * Example
 * - Domain: simpleForm
 * - Access: this.state.simpleForm
 * - simpleTag: "simpleForm"
 * - Initialize: defaultRootState("simpleForm")
 */
export declare const defaultRootState: (simpleTag: string) => any;
/** Interface for read only Redux Action */
export interface IAction<T, P> {
    readonly type: T;
    readonly payload?: P;
}
/** Creates Redux Action enforcing type [T] for Action type, and [P] for Action Payload type */
export declare function createAction<T extends string, P>(type: T, payload: P): IAction<T, P>;
/** Generates message given a potentially null error object */
export declare const errorMessage: (error: any) => any;
/**
 * Utilities
 */
/**
 * @param oldState input from the event.target.value of a button (string) or the oldState from Redux store (boolean)
 */
export declare const booleanToggle: (oldState: string | boolean) => boolean;
/**
 * @param payload `action.payload` from Redux
 * Assumes that the first non-order safe key accessed is the data
 * Only use when action.payload has a single key (ie. the tag with all metadata inside)
 * Otherwise, unpredictable key selection
 */
export declare const getFirstTag: <T = {
    [key: string]: any;
}, UNIONED_TYPE = {
    [key: string]: any;
}>(payload: {
    [key: string]: UNIONED_TYPE;
}) => T;
/**
 * @param json possibly JSON input as a string
 * @returns JSON or string if JSON.parse fails
 */
export declare const jsonOrString: (json: string) => any;
/** Lookup of HTTP Dispatch method */
export declare const HTTPMethodDispatch: any;
