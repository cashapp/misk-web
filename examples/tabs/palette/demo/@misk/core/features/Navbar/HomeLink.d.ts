/// <reference types="react" />
/**
 * <HomeLink
 *    homeName={this.props.homeName}
 *    homeUrl={this.props.homeUrl}
 *  />
 */
export interface IHomeLinkProps {
    homeName?: string;
    homeUrl?: string;
}
export declare const HomeLink: (props: IHomeLinkProps) => JSX.Element;
