import { CombinatorEffect } from "@misk/simpleredux";
import { History } from "history";
import { AnyAction, Reducer } from "redux";
export declare const createIndex: (tabSlug: string, App: ({ history }: {
    history: History<{}>;
}) => JSX.Element, Ducks: {
    rootReducer: (history: History<{}>) => Reducer<any, AnyAction>;
    rootSaga: () => IterableIterator<CombinatorEffect<"ALL", any>>;
}) => void;
