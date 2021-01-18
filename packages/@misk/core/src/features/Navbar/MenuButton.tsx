/** @jsx jsx */
import { Button, Classes, Icon, IconName } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { css, jsx } from "@emotion/react"
import { Link } from "react-router-dom"
import { defaultTheme, ITheme } from "../../utilities"
import { IThemeProps } from "./DimensionAwareNavbar"

/**
 * <MenuButton
 *    handleClick={this.handleClick}
 *    isOpen={this.state.isOpen}
 *    menuIcon={this.props.menuIcon}
 *    menuOpenIcon={this.props.menuOpenIcon}
 *    menuButtonAsLink={this.props.menuButtonAsLink}
 *    menuShowButton={this.props.menuShowButton}
 *  />
 */

export interface IMenuButtonExternalProps extends IThemeProps {
  homeUrl?: string
  menuIcon?: IconName | JSX.Element | string
  menuOpenIcon?: IconName | JSX.Element | string
  menuButtonAsLink?: boolean
  menuShowButton?: boolean
}

export interface IMenuButtonProps extends IMenuButtonExternalProps {
  handleClick: () => any
  isOpen: boolean
}

const cssButton = (theme: ITheme) => css`
  background-color: ${theme.navbarBackground} !important;
  box-shadow: none !important;
  background-image: none !important;
  top: 15px;
  left: 15px;
  position: absolute;
  z-index: 1020;
`

const cssIcon = (theme: ITheme) => css`
  color: ${theme.button} !important;
  &:hover {
    color: ${theme.buttonHover};
  }
`

const cssButtonImg = css`
  max-height: 32px;
`

const ImgOrIcon = (
  props: { icon: IconName | JSX.Element | string } & IThemeProps
) => {
  const { icon, theme } = props
  if (
    typeof icon === "string" &&
    (icon.startsWith("/") || icon.startsWith("http"))
  ) {
    return <img css={cssButtonImg} src={icon as string} />
  } else {
    return <Icon css={cssIcon(theme)} iconSize={32} icon={icon as IconName} />
  }
}

const OpenCloseIcon = (
  props: {
    isOpen: boolean
    menuIcon?: IconName | JSX.Element | string
    menuOpenIcon?: IconName | JSX.Element | string
  } & IThemeProps
) => {
  const { isOpen, menuIcon, menuOpenIcon, theme } = props
  if (isOpen) {
    return <ImgOrIcon icon={menuOpenIcon} theme={theme} />
  } else {
    return <ImgOrIcon icon={menuIcon} theme={theme} />
  }
}

export const MenuButton = (props: IMenuButtonProps) => {
  const {
    handleClick,
    homeUrl,
    isOpen,
    menuIcon = IconNames.MENU,
    menuOpenIcon = IconNames.CROSS,
    menuButtonAsLink = false,
    menuShowButton = true,
    theme = defaultTheme,
  } = props
  if (menuShowButton && !menuButtonAsLink) {
    return (
      <Button css={cssButton(theme)} onClick={handleClick}>
        <OpenCloseIcon
          isOpen={isOpen}
          menuIcon={menuIcon}
          menuOpenIcon={menuOpenIcon}
          theme={theme}
        />
      </Button>
    )
  } else if (menuShowButton && menuButtonAsLink) {
    return (
      <Link css={cssButton(theme)} className={Classes.BUTTON} to={homeUrl}>
        <OpenCloseIcon isOpen={false} menuIcon={menuIcon} theme={theme} />
      </Link>
    )
  } else {
    return <div />
  }
}
