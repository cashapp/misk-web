/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { LinkProps } from "react-router-dom"
import { MiskLink, MiskNavbarHeading } from "../Navbar"

/**
 * <HomeLink
 *    homeName={this.props.homeName}
 *    homeUrl={this.props.homeUrl}
 *  />
 */

export interface IHomeLinkProps {
  homeName?: string
  homeUrl?: string
}

const MiskLinkHome = (props: LinkProps) => (
  <MiskLink css={css({ minWidth: "fit-content" })} {...props} />
)

export const HomeLink = (props: IHomeLinkProps) => {
  const { homeName, homeUrl } = props
  if (homeName && homeUrl) {
    return (
      <MiskLinkHome to={homeUrl}>
        <MiskNavbarHeading>{homeName}</MiskNavbarHeading>
      </MiskLinkHome>
    )
  } else if (homeName) {
    return <MiskNavbarHeading>{homeName}</MiskNavbarHeading>
  } else {
    return <MiskNavbarHeading>Misk</MiskNavbarHeading>
  }
}
