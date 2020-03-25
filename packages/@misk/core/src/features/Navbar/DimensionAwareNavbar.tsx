/** @jsx jsx */
import { Alignment, Navbar, NavbarGroup } from "@blueprintjs/core"
import { css, jsx } from "@emotion/core"
import * as React from "react"
import { Link } from "react-router-dom"
import { ResponsiveContainer } from "../../cssContainers"
import {
  Banner,
  HomeLink,
  IBannerExternalProps,
  IDimensionAwareProps,
  IMenuExternalProps,
  Menu,
  processNavbarItems,
  calculateNavbarItemsByScreenWidth
} from "../Navbar"
import { Environment } from "../../utilities"
import { ITheme, defaultTheme } from "src/utilities/theme"

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
 *    theme={this.props.theme}
 *  />
 */

export interface INavbarProps
  extends IBannerExternalProps,
  IMenuExternalProps,
  IThemeProps {
  environmentNavbarVisible?: Environment[]
  homeName?: string | Element | JSX.Element
  homeUrl?: string
  navbar_items?: Array<string | Element | JSX.Element>
  navbarItemsToDisplay?: number
}

export interface IThemeProps {
  theme?: ITheme
}

const cssNavbar = (theme: ITheme) => css`
  background-color: ${theme.navbarBackground} !important;
  padding-top: 10px !important;
  padding-bottom: 60px !important;
  position: fixed !important;
`

const cssNavbarGroup = (theme: ITheme) => css`
  font-size: 13px !important;
  font-weight: 600 !important;
  position: relative;
  padding-top: 25px;
  padding-bottom: 27px;
  @media (max-width: 870px) {
    padding-left: 60px;
  }
  @media (min-width: 992px) and (max-width: 1085px) {
    padding-left: 60px;
  }
  @media (min-width: 1200px) and (max-width: 1285px) {
    padding-left: 60px;
  }
`

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
      menuIcon,
      menuOpenIcon,
      menuButtonAsLink,
      menuShowButton,
      navbar_items,
      navbarItemsToDisplay = null,
      status,
      theme = defaultTheme,
      width
    } = this.props
    const processedNavbarItems = processNavbarItems(
      theme,
      environment,
      environmentNavbarVisible,
      navbar_items
    )
    const numberOfNavbarItemsToDisplay =
      navbarItemsToDisplay == null
        ? calculateNavbarItemsByScreenWidth(width)
        : navbarItemsToDisplay
    return (
      <Navbar css={cssNavbar(theme)}>
        <ResponsiveContainer>
          <NavbarGroup
            align={Alignment.LEFT}
            className="bp3-dark"
            css={cssNavbarGroup(theme)}
          >
            <HomeLink
              linkComponent={linkComponent}
              homeName={homeName}
              homeUrl={homeUrl}
              theme={theme}
            />
            {processedNavbarItems.slice(0, numberOfNavbarItemsToDisplay)}
          </NavbarGroup>
        </ResponsiveContainer>
        <Menu
          processedNavbarItems={processedNavbarItems}
          error={error}
          links={links}
          linkComponent={linkComponent}
          menuIcon={menuIcon}
          menuOpenIcon={menuOpenIcon}
          menuButtonAsLink={menuButtonAsLink}
          menuShowButton={menuShowButton}
          theme={theme}
        />
        <Banner
          environment={environment}
          environmentBannerVisible={environmentBannerVisible}
          status={status}
          theme={theme}
        />
      </Navbar>
    )
  }
}
