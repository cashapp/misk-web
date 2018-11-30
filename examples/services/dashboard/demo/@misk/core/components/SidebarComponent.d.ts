/// <reference types="react" />
import { IDashboardTab } from "@misk/common";
/**
 * <SidebarComponent tabs={props.tabs}/>
 */
interface ISidebarProps {
    tabs: IDashboardTab[];
}
export declare const SidebarComponent: (props: ISidebarProps) => JSX.Element;
export {};
