import { color } from "./css"
import { Environment } from "./interfaces"
import { environmentToColor } from "./environment"

/**
 * Theme to customize Misk Core components
 *
 * Themable components include:
 * * Navbar
 */
export interface ITheme {
  bannerLinkHover: color | string
  bannerText: color | string
  button: color | string
  buttonHover: color | string
  categoryText: color | string
  environmentToColor: (environment: Environment) => color | string
  navbarBackground: color | string
  navbarLinkHover: color | string
  navbarText: color | string
}

/**
 * Default Theme used in absense of a theme provided in props
 */
export const defaultTheme: ITheme = {
  bannerLinkHover: color.white,
  bannerText: color.accent,
  button: color.gray,
  buttonHover: color.white,
  categoryText: color.gray,
  environmentToColor,
  navbarBackground: color.cadet,
  navbarLinkHover: color.white,
  navbarText: color.platinum
}
