import { Intent } from "@blueprintjs/core";
import { HTTPMethod } from "http-method-enum";
export declare const HTTPMethodIntent: {
    [method in HTTPMethod]: Intent;
};
export declare const HTTPStatusCodeIntent: (code: number) => "none" | "primary" | "success" | "warning" | "danger";
export declare const HTTPMethodDispatch: any;
