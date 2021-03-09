import { AxiosRequestConfig } from "axios";
export declare const initialResponseState: () => {
    data: any;
    error: any;
};
export declare const get: (url: string, config?: AxiosRequestConfig) => Promise<{
    data: any;
    error: any;
}>;
