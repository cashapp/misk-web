/// <reference types="react" />
import { History } from "history";
import { AnyAction, Reducer } from "redux";
import { AllEffect } from "redux-saga/effects";
export declare const createIndex: (tabSlug: string, App: ({ history }: {
    history: History<any>;
}) => JSX.Element, Ducks: {
    rootReducer: (history: History<any>) => Reducer<any, AnyAction>;
    rootSaga: () => IterableIterator<AllEffect>;
}) => void;
