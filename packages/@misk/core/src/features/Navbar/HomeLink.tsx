/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "react-router-dom"
import { MiskNavbarHeading } from "../Navbar"
import { cssMiskLink } from "./Common"

/**
 * <HomeLink
 *    homeName={this.props.homeName}
 *    homeUrl={this.props.homeUrl}
 *  />
 */

export interface IHomeLinkProps {
  homeName?: string | Element | JSX.Element
  homeUrl?: string
  linkComponent?: any
}

export const HomeLink = (props: IHomeLinkProps) => {
  const { homeName, homeUrl } = props
  const LinkComponent = props.linkComponent || Link
  if (homeName && homeUrl) {
    return (
      <LinkComponent
        css={css(cssMiskLink, { minWidth: "fit-content" })}
        to={homeUrl}
      >
        <MiskNavbarHeading>{homeName}</MiskNavbarHeading>
      </LinkComponent>
    )
  } else if (homeName) {
    return <MiskNavbarHeading>{homeName}</MiskNavbarHeading>
  } else {
    return <MiskNavbarHeading>Misk</MiskNavbarHeading>
  }
}
