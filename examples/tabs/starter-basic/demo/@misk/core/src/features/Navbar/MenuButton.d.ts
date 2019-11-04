import { IconName } from "@blueprintjs/core";
import { IThemeProps } from "./DimensionAwareNavbar";
export interface IMenuButtonExternalProps extends IThemeProps {
    homeUrl?: string;
    menuIcon?: IconName | JSX.Element | string;
    menuOpenIcon?: IconName | JSX.Element | string;
    menuButtonAsLink?: boolean;
    menuShowButton?: boolean;
}
export interface IMenuButtonProps extends IMenuButtonExternalProps {
    handleClick: () => any;
    isOpen: boolean;
}
export declare const MenuButton: (props: IMenuButtonProps) => JSX.Element;
