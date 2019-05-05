import * as React from "react"
import { TextHTMLOrElementComponent } from "../../components"
import { Environment, environmentToColor } from "../../utilities"
import { MiskNavbarHeading, MiskNavbarHeadingEnvironment } from "../Navbar"

/**
 * processNavbarItems(environment, environmentNavbarVisible, navbarItems)
 */

const renderEnvironmentLink = (
  environment?: Environment,
  environmentNavbarVisible?: Environment[]
) => {
  if (
    environmentNavbarVisible &&
    environmentNavbarVisible.includes(environment)
  ) {
    return [environment].map((env, index) => (
      <MiskNavbarHeadingEnvironment key={index} color={environmentToColor(env)}>
        {env}
      </MiskNavbarHeadingEnvironment>
    ))
  } else {
    return []
  }
}

const renderNavbarItems = (
  navbarItems?: Array<string | Element | JSX.Element>
) => {
  if (navbarItems) {
    return navbarItems.map((item, index) => (
      <MiskNavbarHeading key={index}>
        <TextHTMLOrElementComponent>{item}</TextHTMLOrElementComponent>
      </MiskNavbarHeading>
    ))
  } else {
    return <span />
  }
}

export const processNavbarItems = (
  environment?: Environment,
  environmentNavbarVisible?: Environment[],
  navbar_items?: Array<string | Element | JSX.Element>
) =>
  renderEnvironmentLink(environment, environmentNavbarVisible).concat(
    renderNavbarItems(navbar_items)
  )

export const truncateNavbarItemsByScreenWidth = (
  width: number,
  navbar_items?: Array<string | Element | JSX.Element>
) => navbar_items.slice(0, Math.floor(Math.min(width - 300, 1800) / 400))
