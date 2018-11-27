/// <reference types="react" />
export interface IUrlTokenMetadata {
    created_at: string;
    long_url: string;
    short_url: string;
    token: string;
    updated_at: string;
}
export declare const Table: (props: {
    data: IUrlTokenMetadata[];
}) => JSX.Element;
export default Table;
