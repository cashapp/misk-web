export interface IError {
    [key: string]: any;
}
export interface IErrorCalloutProps {
    error?: IError;
}
export declare const ErrorCalloutComponent: (props: IErrorCalloutProps) => JSX.Element;
