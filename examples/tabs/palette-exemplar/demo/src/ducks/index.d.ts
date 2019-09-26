import { IRouterProvidedProps, SimpleReduxSaga, ISimpleReduxState, IDispatchSimpleRedux } from "@misk/simpleredux";
import { LocationChangeAction, RouterState } from "connected-react-router";
import { History } from "history";
import { AnyAction, Reducer } from "redux";
import { IDispatchPaletteExemplar, IPaletteExemplarState } from "./paletteExemplar";
export * from "./paletteExemplar";
/**
 * Redux Store State
 */
export interface IState {
    paletteExemplar: IPaletteExemplarState;
    router: Reducer<RouterState, LocationChangeAction>;
    simpleRedux: ISimpleReduxState;
}
/**
 * Dispatcher
 */
export interface IDispatchProps extends IDispatchPaletteExemplar, IDispatchSimpleRedux, IRouterProvidedProps {
}
export declare const rootDispatcher: IDispatchProps;
/**
 * State Selectors
 */
export declare const rootSelectors: (state: IState) => {
    paletteExemplar: any;
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
    paletteExemplar: any;
    router: Reducer<RouterState, LocationChangeAction>;
    simpleRedux: any;
};
export declare const mapDispatchToProps: IDispatchProps;
