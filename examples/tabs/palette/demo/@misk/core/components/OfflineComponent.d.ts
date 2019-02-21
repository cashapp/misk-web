/// <reference types="react" />
import { IconName } from "@blueprintjs/icons";
import { IError } from "./ErrorCalloutComponent";
export interface IOfflineProps {
    icon?: IconName;
    title?: string;
    description?: string;
    endpoint?: string;
    error?: IError;
}
export declare const OfflineComponent: (props: IOfflineProps) => JSX.Element;
