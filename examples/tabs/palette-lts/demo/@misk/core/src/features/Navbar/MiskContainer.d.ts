/// <reference types="react" />
import { INavbarProps } from "src/features/Navbar";
export interface IMiskNavbarContainerProps {
    children?: any;
    dashboardMetadataUrl?: string;
    loadingSpinner?: boolean;
    propsOverrideRemoteData?: boolean;
    serviceMetadataUrl?: string;
}
export declare const miskDashboardMetadataUrl: (dashboardId: string) => string;
export declare const miskServiceMetadataUrl = "/api/service/metadata";
export declare const testAdminDashboardTabsUrl = "https://cashapp.github.io/misk-web/examples/data/demo/adminDashboardTabs.json";
export declare const testServiceMetadataUrl = "https://cashapp.github.io/misk-web/examples/data/demo/serviceMetadata.json";
export declare const MiskNavbarContainer: (props: IMiskNavbarContainerProps & INavbarProps) => JSX.Element;
