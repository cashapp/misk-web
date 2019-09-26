import { IRouterProvidedProps, SimpleReduxSaga, ISimpleReduxState, IDispatchSimpleRedux } from "@misk/simpleredux";
import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { AnyAction, Reducer } from "redux";
/**
 * Redux Store State
 */
export interface IState {
    router: Reducer<RouterState, LocationChangeAction>;
    simpleRedux: ISimpleReduxState;
}
/**
 * Dispatcher
 */
export interface IDispatchProps extends IDispatchSimpleRedux, IRouterProvidedProps {
}
export declare const rootDispatcher: IDispatchProps;
/**
 * State Selectors
 */
export declare const rootSelectors: (state: IState) => {
    router: Reducer<RouterState, LocationChangeAction>;
    simpleRedux: any;
};
/**
 * Reducers
 */
export declare const rootReducer: (history: History<any>) => Reducer<any, AnyAction>;
/**
 * Sagas
 */
export declare function rootSaga(): SimpleReduxSaga;
/**
 * Map Dispatch/State to Props
 */
export declare const mapStateToProps: (state: IState) => {
    router: Reducer<RouterState, LocationChangeAction>;
    simpleRedux: any;
};
export declare const mapDispatchToProps: IDispatchProps;
