/** @jsx jsx */
import {
  css,
  jsx /* eslint-disable-line @typescript-eslint/no-unused-vars */
} from "@emotion/core"
import * as React from "react"
import { TextHTMLOrElementComponent } from "../../components"
import { FlexContainer, ResponsiveContainer } from "../../cssContainers"
import { Environment, ITheme, defaultTheme } from "../../utilities"
import { IThemeProps } from "./DimensionAwareNavbar"

/**
 * <Banner
 *    environment={this.props.environment}
 *    environmentBannerVisible={this.props.environmentBannerVisible}
 *    status={this.props.status}
 *  />
 */

export interface IBannerExternalProps extends IThemeProps {
  environment?: Environment
  environmentBannerVisible?: Environment[]
  status?: string | Element | JSX.Element
}

const cssNavbarBanner = (environment: Environment, theme: ITheme) => css`
  background-color: ${theme.environmentToColor(environment)} !important;
  color: ${theme.bannerText} !important;
  text-align: center;
  font-weight: 600;
  padding: 5px 10px;
  position: fixed !important;
  width: 100%;
  top: 70px;
  left: 0px;
  z-index: 1010 !important;

  a {
    font-weight: 300;
    color: ${theme.bannerText};
    text-decoration: underline;
    letter-spacing: 1px;
    &:hover {
      color: ${theme.bannerLinkHover};
      text-decoration: underline;
    }
  }
`

/* eslint-disable-next-line @typescript-eslint/ban-types */
export class Banner extends React.Component<IBannerExternalProps, {}> {
  public render() {
    const {
      environment,
      environmentBannerVisible,
      status,
      theme = defaultTheme
    } = this.props
    if (
      environmentBannerVisible &&
      environmentBannerVisible.includes(environment)
    ) {
      return (
        <span css={cssNavbarBanner(environment, theme)}>
          <ResponsiveContainer>
            <FlexContainer>
              <TextHTMLOrElementComponent>{status}</TextHTMLOrElementComponent>
            </FlexContainer>
          </ResponsiveContainer>
        </span>
      )
    } else {
      return <div />
    }
  }
}
