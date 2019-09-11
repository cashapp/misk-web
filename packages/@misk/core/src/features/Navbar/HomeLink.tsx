/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "react-router-dom"
import { cssMiskLink, cssNavbarHeading } from "./Common"
import { IThemeProps } from "./DimensionAwareNavbar"
import { defaultTheme } from "src/utilities"

/**
 * <HomeLink
 *    homeName={this.props.homeName}
 *    homeUrl={this.props.homeUrl}
 *  />
 */

export interface IHomeLinkProps extends IThemeProps {
  homeName?: string | Element | JSX.Element
  homeUrl?: string
  linkComponent?: any
}

export const HomeLink = (props: IHomeLinkProps) => {
  const { homeName, homeUrl, theme = defaultTheme } = props
  const LinkComponent = props.linkComponent || Link
  if (homeName && homeUrl) {
    return (
      <LinkComponent
        css={css(cssMiskLink(theme), { minWidth: "fit-content" })}
        to={homeUrl}
      >
        <span css={cssNavbarHeading(theme)}>{homeName}</span>
      </LinkComponent>
    )
  } else if (homeName) {
    return <span css={cssNavbarHeading(theme)}>{homeName}</span>
  } else {
    return <span css={cssNavbarHeading(theme)}>Misk</span>
  }
}
