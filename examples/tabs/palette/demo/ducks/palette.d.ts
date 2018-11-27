import { IAction, IDefaultState } from "@misk/common";
/**
 * This is a Ducks module
 *
 * A Ducks module contains many different parts that work together to provide a complete
 * processing unit for a Redux-Sagas state domain.
 *
 * First, some terminology:
 * State: A central store of the React app's knowledge at a given point in time
 * Redux: unidirectional data flow state management for React (in the spirit of Flux)
 * Redux-Sagas: a Redux pattern that uses Actions, Dispatchers, Sagas, and Reducers to handle state updates
 * Actions: small context objects used to pass around and process state changes. In Misk, they will by default
 *      have fields for `data`, `error`, `loading`, and `success`.
 * Dispatchers: An object that has functions that dispatch actions. The Dispatcher has one function for each action.
 *      The advantages of a Dispatcher and dispatching functions are as follows:
 *        - Import a single Dispatcher object and have access to all action-dispatching functions
 *        - Dispatching function ensures consistent formatting for emitted actions
 *        - Dispatching function can handle any marshalling or default values to set in the action
 * Sagas: A generating function that handles actions asynchronously. Each Duck Saga is registered with the tab
 *       rootSaga and has an array of take{Latest|Every} functions that bind an action to a handling function.
 *       The handling function is also an asynchronous generating function that does any web requests or blocking
 *       state change computation. In the process of computation, it can yield other actions to signal
 *       success, failure, or progress which will consequently be picked up and handled asynchronously by other handlers.
 * Reducers: Maintain up to date state by continuing to merge in changes as they come from dispatched actions.
 *       Each Duck Reducer is registered with the tab's rootReducer to provide a single merged reducer for all state change.
 *       Each Duck Reducer effectively is responsible for a domain or keyspace of the global state object.
 *       The structure and typing of this state domain is defined in the Duck State Interface.
 * Interface: a Typescript specific syntax that allows definition of an object interface with expected keys and value types
 * Ducks: a Redux-Sagas pattern that puts all elements in a single Ducks module file instead of different directories
 *
 * Why would you need a Ducks module
 * By convention in Misk, state is not ever updated directly from a React container or component.
 * This idiom is called unidirectional data flow and it makes for easier state management in React apps.
 * The current state is always displayed by the React container/component but any changes are handled by
 * a Ducks module. This separates the View and Controller functionality of a React app.
 *
 * Instead it is updated through a Ducks module. This ensures predictable and debuggable state updates
 * because a single rootSaga and rootReducer handle all state change Actions across the entire Misk tab.
 * The Ducks pattern also makes use of modern Javascript generating functions which allow for asynchronous
 * processing of all non-View related computation letting you build non-View-blocking React apps.
 *
 * Pro tip: Use the Redux DevTools Chrome plugin to see all state changes in your tab as they occur.
 * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
 *
 * Using the Redux-Sagas Ducks pattern helps developers easily build Misk tabs with minimal
 * front end React, Redux, or Sagas knowledge.
 *
 * Getting Started
 * If your tab ever retrieves resources from the Web or from Misk server, you need a Ducks module.
 * Your Ducks module will need the required elements (Actions, Dispatchers, Sagas, Reducers, State Interface)
 * Specifically it will need to export:
 *  - Dispatcher object: contains all of your dispatcher functions that trigger Actions
 *  - watchSagas function: which is your Ducks Saga for handing off Actions to the correct handling function
 *  - Reducer: to handle merging in state changes to the domain of the state your Ducks manages
 *  - State Interface: Typescript interface for what your Ducks state contains
 *
 * These must all be imported into src/ducks/index.ts and wired up to respective rootReducer, rootSaga,
 * and global State Interfaces.
 *
 * Displaying State
 * In a Container, you can wire up your Dispatcher object and Ducks State to be props accessible in the container.
 * This is done using mapStateToProps and mapDispatchToProps functions.
 * Your props will then always have the up to date state which you can render with regular React render(),
 * and it will always have a mounted function from your Dispatcher object so you can trigger a given action
 * to kick off a Ducks flow to retrieve data or do other asynchronous computation.
 */
/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export declare enum PALETTE {
    GET = "PALETTE_GET",
    GET_ONE = "PALETTE_GET_ONE",
    SAVE = "PALETTE_SAVE",
    PUT = "PALETTE_PUT",
    PATCH = "PALETTE_PATCH",
    DELETE = "PALETTE_DELETE",
    SUCCESS = "PALETTE_SUCCESS",
    FAILURE = "PALETTE_FAILURE"
}
/**
 * Dispatch Object
 * Object of functions that dispatch Actions with standard defaults and any required passed in input
 * dispatch Object is used within containers to initiate any saga provided functionality
 */
export declare const dispatchPalette: {
    delete: (id: number) => IAction<PALETTE.DELETE, {
        id: number;
        loading: boolean;
        success: boolean;
        error: any;
    }>;
    failure: (error: any) => IAction<PALETTE.FAILURE, any>;
    patch: (id: number, data: any) => IAction<PALETTE.PATCH, any>;
    put: (id: number, data: any) => IAction<PALETTE.PUT, any>;
    request: () => IAction<PALETTE.GET, {
        loading: boolean;
        success: boolean;
        error: any;
    }>;
    requestOne: (id: number) => IAction<PALETTE.GET_ONE, {
        id: number;
        loading: boolean;
        success: boolean;
        error: any;
    }>;
    save: (data: any) => IAction<PALETTE.SAVE, any>;
    success: (data: any) => IAction<PALETTE.SUCCESS, any>;
};
export declare function watchExampleSagas(): IterableIterator<import("redux-saga/effects").AllEffect>;
/**
 * Duck Reducer
 * Merges dispatched action objects on to the existing (or initial) state to generate new state
 */
export default function ExampleReducer(state: any, action: IAction<string, {}>): any;
/**
 * State Interface
 * Provides a complete Typescript interface for the object on state that this duck manages
 * Consumed by the root reducer in ./ducks index to update global state
 * Duck state is attached at the root level of global state
 */
export interface IPalleteState extends IDefaultState {
    [key: string]: any;
}
