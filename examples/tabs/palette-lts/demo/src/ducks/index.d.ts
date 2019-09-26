import { IDispatchSimpleForm, IDispatchSimpleNetwork, IRouterProvidedProps, ISimpleFormState, ISimpleNetworkState, SimpleReduxSaga } from "@misk/simpleredux";
import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { AnyAction, Reducer } from "redux";
import { IDispatchPalette, IPaletteState } from "./palette";
export * from "./palette";
/**
 * Redux Store State
 */
export interface IState {
    palette: IPaletteState;
    router: Reducer<RouterState, LocationChangeAction>;
    simpleForm: ISimpleFormState;
    simpleNetwork: ISimpleNetworkState;
}
/**
 * Dispatcher
 */
export interface IDispatchProps extends IDispatchPalette, IDispatchSimpleForm, IDispatchSimpleNetwork, IRouterProvidedProps {
}
export declare const rootDispatcher: IDispatchProps;
/**
 * State Selectors
 */
export declare const rootSelectors: (state: IState) => {
    palette: any;
    router: Reducer<RouterState, LocationChangeAction>;
    simpleForm: any;
    simpleNetwork: any;
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
    palette: any;
    router: Reducer<RouterState, LocationChangeAction>;
    simpleForm: any;
    simpleNetwork: any;
};
export declare const mapDispatchToProps: IDispatchProps;
