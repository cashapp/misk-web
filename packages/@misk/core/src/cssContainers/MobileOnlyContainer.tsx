import styled, { StyledComponent } from "@emotion/styled"

/**
 * <MobileOnlyContainer>
 *    <span>Stuff</span>
 * </MobileOnlyContainer>
 */

export const MobileOnlyContainer: StyledComponent<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    any
  >,
  any
> = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`
