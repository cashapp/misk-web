/** @jsx jsx */
import { jsx } from "@emotion/react"
import { TextHTMLOrElementComponent } from "../../components"
import { Environment, ITheme } from "src/utilities"
import { cssNavbarHeadingEnvironment, cssNavbarHeading } from "./Common"

/**
 * processNavbarItems(environment, environmentNavbarVisible, navbarItems)
 */

const renderEnvironmentLink = (
  theme: ITheme,
  environment?: Environment,
  environmentNavbarVisible?: Environment[]
) => {
  if (
    environmentNavbarVisible &&
    environmentNavbarVisible.includes(environment)
  ) {
    return [environment].map((env, index) => (
      <span css={cssNavbarHeadingEnvironment(env, theme)} key={index}>
        {env}
      </span>
    ))
  } else {
    return []
  }
}

const renderNavbarItems = (
  theme: ITheme,
  navbarItems?: Array<string | Element | JSX.Element>
) => {
  if (navbarItems) {
    return navbarItems.map((item, index) => (
      <span css={cssNavbarHeading(theme)} key={index}>
        <TextHTMLOrElementComponent>{item}</TextHTMLOrElementComponent>
      </span>
    ))
  } else {
    return <span />
  }
}

export const processNavbarItems = (
  theme: ITheme,
  environment?: Environment,
  environmentNavbarVisible?: Environment[],
  navbar_items?: Array<string | Element | JSX.Element>
) =>
  renderEnvironmentLink(theme, environment, environmentNavbarVisible).concat(
    renderNavbarItems(theme, navbar_items)
  )

export const calculateNavbarItemsByScreenWidth = (width: number) =>
  Math.floor(Math.min(width - 300, 1800) / 400)
