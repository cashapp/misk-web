/** @jsx jsx */
import { Collapse } from "@blueprintjs/core"
import { css, jsx } from "@emotion/core"
import { chain, sortBy } from "lodash"
import * as React from "react"
import { Link } from "react-router-dom"
import { ErrorCalloutComponent } from "../../components"
import { FlexContainer, ResponsiveContainer } from "../../cssContainers"
import { IDashboardTab, defaultTheme, ITheme } from "../../utilities"
import { cssMiskLink } from "./Common"
import { MenuButton, IMenuButtonExternalProps } from "./MenuButton"
import { IThemeProps } from "./DimensionAwareNavbar"

/**
 * <Menu
 *    error={this.props.error}
 *    links={this.props.links}
 *    processedNavbarItems={this.props.processedNavbarItems}
 *    ...IMenuButtonExternalProps...
 *  />
 */

export interface IMenuExternalProps
  extends IMenuButtonExternalProps,
    IThemeProps {
  error?: any
  links?: IDashboardTab[]
  linkComponent?: any
}

export interface IMenuProps extends IMenuExternalProps {
  processedNavbarItems?: JSX.Element[]
}

const cssCollapse = (theme: ITheme) => css`
  background-color: ${theme.navbarBackground};
  display: block;
  margin: 60px -20px 0 -20px;
`

const cssMenu = css`
  min-height: 250px;
  padding: 50px 0px;
  @media (max-width: 768px) {
    padding: 50px 20px;
  }
  overflow-y: scroll;
  max-height: 100vh;
`

const cssMenuNavbarItems = css`
  display: inline-block;
`

const cssMenuLinks = css`
  padding-bottom: 35px;
`

const cssMenuLink = (theme: ITheme) => css`
  font-size: 16px;
  flex-basis: 300px;
  padding: 5px 0;
  color: ${theme.navbarText};
`

const cssMenuCategory = (theme: ITheme) => css`
  font-size: 24px;
  color: ${theme.categoryText};
  letter-spacing: 0px;
  display: block;
`

const cssMenuDivider = (theme: ITheme) => css`
  border-color: ${theme.categoryText};
  margin: 5px 0 10px 0;
`

const MenuHeading = (props: { categoryName: string } & IThemeProps) => {
  const { categoryName, theme = defaultTheme } = props
  if (categoryName === "undefined") {
    return <span />
  } else {
    return (
      <div>
        <span css={css(cssMenuCategory(theme))}>{categoryName}</span>
        <hr css={cssMenuDivider(theme)} />
      </div>
    )
  }
}

const MenuCategory = (
  props: {
    categoryName: string
    categoryLinks: IDashboardTab[]
    handleClick: () => void
    LinkComponent: any
  } & IThemeProps
) => {
  const {
    categoryName,
    categoryLinks,
    handleClick,
    LinkComponent,
    theme = defaultTheme
  } = props
  return (
    <div>
      <MenuHeading categoryName={categoryName} />
      <FlexContainer css={cssMenuLinks}>
        {categoryLinks &&
          categoryLinks.map((link: IDashboardTab) => {
            const cssProps = css(cssMiskLink(theme), cssMenuLink(theme))
            if (link.url_path_prefix.startsWith("http")) {
              return (
                <a
                  css={cssProps}
                  key={link.slug}
                  onClick={handleClick}
                  href={link.url_path_prefix}
                >
                  {link.name}
                </a>
              )
            } else {
              return (
                <LinkComponent
                  css={cssProps}
                  key={link.slug}
                  onClick={handleClick}
                  to={link.url_path_prefix}
                >
                  {link.name}
                </LinkComponent>
              )
            }
          })}
      </FlexContainer>
    </div>
  )
}

export class Menu extends React.Component<IMenuProps, {}> {
  public state = {
    isOpen: false
  }

  public render() {
    const { isOpen } = this.state
    const {
      error,
      links,
      linkComponent = Link,
      processedNavbarItems,
      menuIcon,
      menuOpenIcon,
      menuButtonAsLink,
      menuShowButton,
      theme = defaultTheme
    } = this.props
    return (
      <div>
        <MenuButton
          handleClick={this.handleClick}
          isOpen={isOpen}
          menuIcon={menuIcon}
          menuOpenIcon={menuOpenIcon}
          menuButtonAsLink={menuButtonAsLink}
          menuShowButton={menuShowButton}
          theme={theme}
        />
        <div css={cssCollapse(theme)}>
          <Collapse isOpen={isOpen} keepChildrenMounted={true}>
            <div css={cssMenu}>
              <ResponsiveContainer>
                <div css={cssMenuNavbarItems}>
                  <FlexContainer>
                    {processedNavbarItems &&
                      processedNavbarItems.map((item, index) => (
                        <span key={index} onClick={this.handleClick}>
                          {item}
                        </span>
                      ))}
                  </FlexContainer>
                </div>
                {links ? (
                  this.renderMenuCategories(links, linkComponent, theme)
                ) : (
                  <ErrorCalloutComponent error={error} />
                )}
              </ResponsiveContainer>
            </div>
          </Collapse>
        </div>
      </div>
    )
  }

  private renderMenuCategories(
    links: IDashboardTab[],
    LinkComponent: any,
    theme: ITheme
  ) {
    const categories: Array<[string, IDashboardTab[]]> = Object.entries(
      // sort and group array of links by category string
      // and sort each category's links by lower case tab name string
      chain(links)
        .sortBy("category")
        .groupBy("category")
        .mapValues(category =>
          sortBy(category, (tab: IDashboardTab) => tab.name.toLowerCase())
        )
        .value()
    )
    return (
      categories &&
      categories.map(([categoryName, categoryLinks], index) => (
        <MenuCategory
          categoryName={categoryName}
          categoryLinks={categoryLinks}
          key={`${categoryName}-${index}`}
          handleClick={this.handleClick}
          LinkComponent={LinkComponent}
          theme={theme}
        />
      ))
    )
  }

  private handleClick = () => {
    this.setState({ ...this.state, isOpen: !this.state.isOpen })
  }
}
