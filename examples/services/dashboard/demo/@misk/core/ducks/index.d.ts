export * from "./defaults";
export * from "./routerDucks";
export * from "./simpleNetworkDucks";
export interface IAction<T, P> {
    readonly type: T;
    readonly payload?: P;
}
export declare function createAction<T extends string, P>(type: T, payload: P): IAction<T, P>;
export declare const errorMessage: (error: any) => any;
