/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import styled, { StyledComponent } from "@emotion/styled"
import * as React from "react"
import { color } from "../../utilities"

export const MiskNavbarHeading: StyledComponent<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >,
  Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    any
  >,
  any
> = styled.span`
  font-size: 24px !important;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0px;
  margin-right: 30px;
  color: ${color.platinum};
  min-width: fit-content;

  a {
    color: ${color.platinum} !important;
    letter-spacing: 1px;
    text-decoration: none;
    &:hover {
      color: ${color.white} !important;
      text-decoration: none;
    }
  }
`

export const MiskNavbarHeadingEnvironment = (
  props: { color: string } & any
) => (
  <MiskNavbarHeading
    css={css`
      color: ${props.color} !important;
      min-width: 0;
    `}
    {...props}
  />
)

export const cssMiskLink = css`
  color: ${color.gray};
  text-decoration: none;
  &:hover {
    color: ${color.white};
    text-decoration: none;
  }
`
