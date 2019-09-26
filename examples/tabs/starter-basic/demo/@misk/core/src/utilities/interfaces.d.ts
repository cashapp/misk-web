/// <reference types="react" />
export interface IWebTab {
    slug: string;
    url_path_prefix: string;
    capabilities?: string[];
    services?: string[];
}
export interface IDashboardTab extends IWebTab {
    name: string;
    category?: string;
}
export interface IAdminDashboardTab extends IDashboardTab {
}
export interface IServiceMetadata {
    admin_dashboard_url: string;
    app_name: string;
    environment: Environment;
    navbar_items?: Array<string | Element | JSX.Element>;
    navbar_status?: string | Element | JSX.Element;
}
export declare const enum Environment {
    TESTING = "TESTING",
    DEVELOPMENT = "DEVELOPMENT",
    STAGING = "STAGING",
    PRODUCTION = "PRODUCTION"
}
export declare const enum DateFormat {
    year = "YYYY",
    month = "YYYY-MM",
    day = "YYYY-MM-DD",
    minute = "YYYY-MM-DD HH:mm",
    second = "YYYY-MM-DD HH:mm:ss",
    millisecond = "YYYY-MM-DD HH:mm:ss:SSS",
    minuteAMPM = "YYYY-MM-DD hh:mm A",
    secondAMPM = "YYYY-MM-DD hh:mm:ss A",
    millisecondAMPM = "YYYY-MM-DD hh:mm:ss:SSS A"
}
export declare const enum IBinderKeys {
    NavNavbarMenu = "NavNavbarMenu",
    TabEntry = "TabEntry"
}
export interface IBinder {
    multibind: (binder: IBinderKeys, key: string, value: any) => any;
}
export interface IWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    Misk: {
        Binder: IBinder;
        Common: any;
        Components: any;
        History: any;
    };
    MiskTabs: {
        Config: any;
        Loader: any;
    };
    MiskBinders: any;
}
