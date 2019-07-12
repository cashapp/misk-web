/** @jsx jsx */
import { Link, LinkProps } from "react-router-dom"
import { css, jsx, SerializedStyles } from "@emotion/core"
import styled, { StyledComponent } from "@emotion/styled"
import * as React from "react"
import { branch, compose, InferableComponentEnhancerWithProps, mapProps, renderComponent, withProps } from "recompose"
import { color, IDashboardTab } from "../../utilities"

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


const myAnchorYarr = (props: any) => (<a {...props} />)
const enhancer = mapProps((props: LinkProps) => ({ children: props.children, css: css(cssMiskLink), href: props.to.toString() }))
const normalA = enhancer(myAnchorYarr);

export const MiskLink = (props: LinkProps & { children: any, key: string, onClick: () => void, to: string }) => branch(
  (props: LinkProps & { children: any, key: string, onClick: () => void, to: string }) => props.to.startsWith("http"),
  renderComponent(normalA),
  renderComponent((withProps({ css: css(cssMiskLink) }) as InferableComponentEnhancerWithProps<LinkProps, { css: SerializedStyles }>)(Link))
)




// export const MiskLink = branch(
//   (props: LinkProps & { to: string }) => props.to.startsWith("http"),
//   renderComponent((props: LinkProps) => (<a
//     css={css(cssMiskLink)}
//     href={`${props.to}`}
//   />)),
//   renderComponent((props: LinkProps) => (
//     <Link css={cssMiskLink} to={props.to} />)),
// )


// if (link.url_path_prefix.startsWith("http")) {
//   return (

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
