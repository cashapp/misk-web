/// <reference types="react" />
import { IconName } from "@blueprintjs/icons";
import { IError } from "./ErrorCalloutComponent";
/**
 * <OfflineComponent
 *    error={props.error}
 *    icon={IconNames.OFFLINE}
 *    title={"Uh oh!"}
 *    description={"We broke it."}
 *    endpoint={"/api/broken/endpoint"}
 * />
 */
export interface IOfflineProps {
    icon?: IconName;
    title?: string;
    description?: string;
    endpoint?: string;
    error?: IError;
}
export declare const OfflineComponent: (props: IOfflineProps) => JSX.Element;
