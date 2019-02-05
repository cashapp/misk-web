/// <reference types="react" />
export * from "./actions";
export * from "./css";
interface IWebTab {
    slug: string;
    url_path_prefix: string;
    roles?: string[];
    services?: string[];
}
interface IDashboardTab extends IWebTab {
    name: string;
    category?: string;
}
interface IAdminDashboardTab extends IDashboardTab {
}
interface IServiceMetadata {
    admin_dashboard_url: string;
    app_name: string;
    environment: Environment;
    navbar_items?: Array<string | Element | JSX.Element>;
    navbar_status?: string | Element | JSX.Element;
}
declare enum Environment {
    TESTING = "TESTING",
    DEVELOPMENT = "DEVELOPMENT",
    STAGING = "STAGING",
    PRODUCTION = "PRODUCTION"
}
declare enum DateFormat {
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
interface IDefaultState {
    data?: any;
    error?: any;
    loading?: boolean;
    success?: boolean;
    toJS?: () => any;
}
declare const defaultState: IDefaultState;
declare enum IBinderKeys {
    NavNavbarMenu = "NavNavbarMenu",
    TabEntry = "TabEntry"
}
interface IBinder {
    multibind: (binder: IBinderKeys, key: string, value: any) => any;
}
interface IWindow extends Window {
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
export { DateFormat, defaultState, Environment, IWebTab, IDashboardTab, IAdminDashboardTab, IServiceMetadata, IDefaultState, IBinder, IBinderKeys, IWindow };
