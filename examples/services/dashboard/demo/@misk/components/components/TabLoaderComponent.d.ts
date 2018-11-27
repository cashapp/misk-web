/// <reference types="react" />
import { IWebTab } from "@misk/common";
/**
 * <TabLoaderComponent
 *    tabs={adminDashboardTabs}
 * />
 */
export interface ITabLoaderProps {
    tabs: IWebTab[];
}
export declare const TabLoaderComponent: (props: ITabLoaderProps) => JSX.Element;
