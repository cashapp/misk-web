import { IThemeProps } from "./DimensionAwareNavbar";
export interface IHomeLinkProps extends IThemeProps {
    homeName?: string | Element | JSX.Element;
    homeUrl?: string;
    linkComponent?: any;
}
export declare const HomeLink: (props: IHomeLinkProps) => JSX.Element;
