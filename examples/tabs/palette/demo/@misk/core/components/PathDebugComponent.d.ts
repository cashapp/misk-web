/// <reference types="react" />
/**
 * <PathDebugComponent
 *    hash={props.location.hash}
 *    pathname={props.location.pathname}
 *    search={props.location.search}
 * />
 */
export interface IPathDebugProps {
    hash: string;
    pathname: string;
    search: string;
}
export declare const PathDebugComponent: (props: IPathDebugProps) => JSX.Element;
