/** @jsx jsx */
import { Alignment, Navbar, NavbarGroup } from "@blueprintjs/core"
import { css, jsx } from "@emotion/core"
import * as React from "react"
import { Link } from "react-router-dom"
import { ResponsiveContainer } from "../../cssContainers"
import {
  Banner,
  HomeLink,
  IDimensionAwareProps,
  Menu,
  // NavItems,
  processNavbarItems
} from "."
import { color, Environment, IDashboardTab } from "../../utilities"
import { truncateNavbarItemsByScreenWidth } from "./processNavbarItems"

/**
 * <DimensionAwareComponent
 *    height={this.state.height}
 *    width={this.state.width}
 *    environment={this.props.environment}
 *    environmentBannerVisible={this.props.environmentBannerVisible}
 *    environmentNavbarVisible={this.props.environmentBannerVisible}
 *    error={this.props.error}
 *    homeName={this.props.homeName}
 *    homeUrl={this.props.homeUrl}
 *    links={this.props.links}
 *    navbarItems={this.props.navbarItems}
 *    status={this.props.status}
 *  />
 */

export interface INavbarProps {
  environment?: Environment
  environmentBannerVisible?: Environment[]
  environmentNavbarVisible?: Environment[]
  error?: any
  homeName?: string
  homeUrl?: string
  navbar_items?: Array<string | Element | JSX.Element>
  linkComponent?: any
  links?: IDashboardTab[]
  status?: string | Element | JSX.Element
}

const MiskNavbar = (props: any) => (
  <Navbar
    css={css`
      background-color: ${color.cadet} !important;
      padding-top: 10px !important;
      padding-bottom: 60px !important;
      position: fixed !important;
    `}
    {...props}
  />
)

const MiskNavbarGroup = (props: any) => (
  <NavbarGroup
    css={css`
      font-size: 13px !important;
      font-weight: 600 !important;
      position: relative;
      padding-top: 25px;
      padding-bottom: 27px;
      color: ${color.gray};
      &:hover {
        color: ${color.white};
        text-decoration: none;
      }
      @media (max-width: 870px) {
        padding-left: 60px;
      }
      @media (min-width: 992px) and (max-width: 1085px) {
        padding-left: 60px;
      }
      @media (min-width: 1200px) and (max-width: 1285px) {
        padding-left: 60px;
      }
    `}
    {...props}
  />
)

export class DimensionAwareNavbar extends React.Component<
  IDimensionAwareProps & INavbarProps,
  {}
> {
  // TODO see if this can be removed
  public state = {
    isOpen: false
  }

  public render() {
    const {
      environment,
      environmentBannerVisible,
      environmentNavbarVisible,
      error,
      homeName,
      homeUrl,
      linkComponent = Link,
      links,
      navbar_items,
      width,
      status
    } = this.props
    const processedNavbarItems = processNavbarItems(
      environment,
      environmentNavbarVisible,
      navbar_items
    )
    return (
      <MiskNavbar>
        <ResponsiveContainer>
          <MiskNavbarGroup align={Alignment.LEFT} className="bp3-dark">
            <HomeLink
              linkComponent={linkComponent}
              homeName={homeName}
              homeUrl={homeUrl}
            />
            {truncateNavbarItemsByScreenWidth(width, processedNavbarItems)}
          </MiskNavbarGroup>
        </ResponsiveContainer>
        <Menu
          processedNavbarItems={processedNavbarItems}
          error={error}
          links={links}
          linkComponent={linkComponent}
        />
        <Banner
          environment={environment}
          environmentBannerVisible={environmentBannerVisible}
          status={status}
        />
      </MiskNavbar>
    )
  }
}
