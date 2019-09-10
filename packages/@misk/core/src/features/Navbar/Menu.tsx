/** @jsx jsx */
import { Collapse } from "@blueprintjs/core"
import { css, jsx } from "@emotion/core"
import { chain, sortBy } from "lodash"
import * as React from "react"
import { Link } from "react-router-dom"
import { ErrorCalloutComponent } from "../../components"
import { FlexContainer, ResponsiveContainer } from "../../cssContainers"
import { color, IDashboardTab } from "../../utilities"
import { cssMiskLink } from "./Common"
import { MenuButton, IMenuButtonExternalProps } from "./MenuButton"

/**
 * <Menu
 *    error={this.props.error}
 *    links={this.props.links}
 *    processedNavbarItems={this.props.processedNavbarItems}
 *    ...IMenuButtonExternalProps...
 *  />
 */

export interface IMenuExternalProps extends IMenuButtonExternalProps {
  error?: any
  links?: IDashboardTab[]
  linkComponent?: any
}

export interface IMenuProps extends IMenuExternalProps {
  processedNavbarItems?: JSX.Element[]
}

const cssCollapse = css`
  color: ${color.white};
  background-color: ${color.cadet};
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

const cssMenuLink = css`
  font-size: 16px;
  flex-basis: 300px;
  padding: 5px 0;
  color: ${color.platinum};
`

const cssMenuCategory = css`
  font-size: 24px;
  color: ${color.gray};
  letter-spacing: 0px;
  display: block;
`

const cssMenuDivider = css`
  border-color: ${color.gray};
  margin: 5px 0 10px 0;
`

const MenuHeading = (props: { categoryName: string }) => {
  if (props.categoryName === "undefined") {
    return <span />
  } else {
    return (
      <div>
        <span css={css(cssMenuCategory)}>{props.categoryName}</span>
        <hr css={cssMenuDivider} />
      </div>
    )
  }
}

const MenuCategory = (props: {
  categoryName: string
  categoryLinks: IDashboardTab[]
  handleClick: () => void
  linkComponent: any
}) => (
  <div>
    <MenuHeading categoryName={props.categoryName} />
    <FlexContainer css={cssMenuLinks}>
      {props.categoryLinks &&
        props.categoryLinks.map((link: IDashboardTab) => {
          const cssProps = css(cssMiskLink, cssMenuLink)
          if (link.url_path_prefix.startsWith("http")) {
            return (
              <a
                css={cssProps}
                key={link.slug}
                onClick={props.handleClick}
                href={link.url_path_prefix}
              >
                {link.name}
              </a>
            )
          } else {
            return (
              <props.linkComponent
                css={cssProps}
                key={link.slug}
                onClick={props.handleClick}
                to={link.url_path_prefix}
              >
                {link.name}
              </props.linkComponent>
            )
          }
        })}
    </FlexContainer>
  </div>
)

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
      menuShowButton
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
        />
        <div css={cssCollapse}>
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
                  this.renderMenuCategories(links, linkComponent)
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

  private renderMenuCategories(links: IDashboardTab[], linkComponent: any) {
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
          linkComponent={linkComponent}
        />
      ))
    )
  }

  private handleClick = () => {
    this.setState({ ...this.state, isOpen: !this.state.isOpen })
  }
}
