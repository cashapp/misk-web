import { css } from "@emotion/core"
import { defaultTheme, Environment, ITheme } from "src/utilities"

export const cssNavbarHeading = (theme: ITheme) => css`
  font-size: 24px !important;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0px;
  margin-right: 30px;
  color: ${theme.navbarText};
  min-width: fit-content;

  a {
    color: ${theme.navbarText} !important;
    letter-spacing: 1px;
    text-decoration: none;
    &:hover {
      color: ${theme.navbarLinkHover} !important;
      text-decoration: none;
    }
  }
`

export const cssNavbarHeadingEnvironment = (
  environment: Environment,
  theme: ITheme = defaultTheme
) =>
  css(
    cssNavbarHeading(theme),
    `
color: ${theme.environmentToColor(environment)} !important;
min-width: 0;
`
  )

export const cssMiskLink = (theme: ITheme) => css`
  color: ${theme.navbarText};
  text-decoration: none;
  &:hover {
    color: ${theme.navbarLinkHover};
    text-decoration: none;
  }
`
