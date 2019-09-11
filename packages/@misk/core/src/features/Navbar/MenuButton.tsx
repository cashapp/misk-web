/** @jsx jsx */
import { Button, Classes, Icon, IconName } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { css, jsx } from "@emotion/core"
import { Link } from "react-router-dom"
import { color } from "../../utilities"

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

export interface IMenuButtonExternalProps {
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

const cssButton = css`
  background-color: ${color.cadet} !important;
  box-shadow: none !important;
  background-image: none !important;
  top: 15px;
  left: 15px;
  position: absolute;
  z-index: 1020;
`

const cssIcon = css`
  color: ${color.gray} !important;
  &:hover {
    color: ${color.white};
  }
`

const ImgOrIcon = (props: { icon: IconName | JSX.Element | string }) => {
  const { icon } = props
  if (
    typeof icon === "string" &&
    (icon.startsWith("/") || icon.startsWith("http"))
  ) {
    return <img css={css(`max-height: 32px;`)} src={icon as string} />
  } else {
    return <Icon css={cssIcon} iconSize={32} icon={icon as IconName} />
  }
}

const OpenCloseIcon = (props: {
  isOpen: boolean
  menuIcon?: IconName | JSX.Element | string
  menuOpenIcon?: IconName | JSX.Element | string
}) => {
  const { isOpen, menuIcon, menuOpenIcon } = props
  if (isOpen) {
    return <ImgOrIcon icon={menuOpenIcon} />
  } else {
    return <ImgOrIcon icon={menuIcon} />
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
    menuShowButton = true
  } = props
  console.log("MB", props)
  if (menuShowButton && !menuButtonAsLink) {
    return (
      <Button css={cssButton} onClick={handleClick}>
        <OpenCloseIcon
          isOpen={isOpen}
          menuIcon={menuIcon}
          menuOpenIcon={menuOpenIcon}
        />
      </Button>
    )
  } else if (menuShowButton && menuButtonAsLink) {
    return (
      <Link css={cssButton} className={Classes.BUTTON} to={homeUrl}>
        <OpenCloseIcon isOpen={false} menuIcon={menuIcon} />
      </Link>
    )
  } else {
    return <div />
  }
}
