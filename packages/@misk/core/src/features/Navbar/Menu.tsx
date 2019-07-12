/** @jsx jsx */
import { Button, Collapse, Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { css, jsx } from "@emotion/core"
import { chain, sortBy } from "lodash"
import * as React from "react"
import { ErrorCalloutComponent } from "../../components"
import { FlexContainer, ResponsiveContainer } from "../../cssContainers"
import { MiskLink } from "../Navbar"
import { color, IDashboardTab } from "../../utilities"
import { cssMiskLink } from "./Common"

/**
 * <Menu
 *    error={this.props.error}
 *    links={this.props.links}
 *    processedNavbarItems={this.props.processedNavbarItems}
 *  />
 */

export interface IMenuProps {
  error?: any
  links?: IDashboardTab[]
  processedNavbarItems?: JSX.Element[]
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

const MenuCategory = (props: {
  categoryName: string
  categoryLinks: IDashboardTab[]
  handleClick: () => void
}) => (
    <div>
      <span css={cssMenuCategory}>
        {props.categoryName === "undefined" ? "" : props.categoryName}
      </span>
      <hr css={cssMenuDivider} />
      <FlexContainer css={cssMenuLinks}>
        {props.categoryLinks &&
          props.categoryLinks.map((link: IDashboardTab) => {
            <MiskLink
              key={link.slug}
              onClick={props.handleClick}
              to={link.url_path_prefix}
            >
              {link.name}
            </MiskLink>
            // if (link.url_path_prefix.startsWith("http")) {
            //   return (
            //     <a
            //       css={css(cssMiskLink, cssMenuLink)}
            // key={link.slug}
            // onClick={props.handleClick}
            //       href={link.url_path_prefix}
            //     >
            //       {link.name}
            //     </a>
            //   )
            // } else {
            //   return (
            //     <MiskLink
            //       css={cssMenuLink}
            //       key={link.slug}
            //       onClick={props.handleClick}
            //       to={link.url_path_prefix}
            //     >
            //       {link.name}
            //     </MiskLink>
            //   )
            // }
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
    const { error, links, processedNavbarItems } = this.props
    return (
      <div>
        <Button css={cssButton} onClick={this.handleClick}>
          <Icon
            css={cssIcon}
            iconSize={32}
            icon={isOpen ? IconNames.CROSS : IconNames.MENU}
          />
        </Button>
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
                  this.renderMenuCategories(links)
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

  private renderMenuCategories(links: IDashboardTab[]) {
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
          key={index}
          handleClick={this.handleClick}
        />
      ))
    )
  }

  private handleClick = () => {
    this.setState({ ...this.state, isOpen: !this.state.isOpen })
  }
}
