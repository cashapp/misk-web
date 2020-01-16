/** @jsx jsx */
import { IThemeProps } from "./DimensionAwareNavbar"
import { ITheme } from "src/utilities/theme"
import { css, jsx } from "@emotion/core"
import React from "react"
import { NavbarGroup, INavbarGroupProps } from "@blueprintjs/core"

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

export interface IMiskNavbarGroupProps extends INavbarGroupProps, IThemeProps {}

export class MiskNavbarGroup extends React.Component<IMiskNavbarGroupProps> {
  render() {
    return (
      <NavbarGroup
        className="bp3-dark"
        css={cssNavbarGroup(this.props.theme)}
        {...this.props}
      ></NavbarGroup>
    )
  }
}
