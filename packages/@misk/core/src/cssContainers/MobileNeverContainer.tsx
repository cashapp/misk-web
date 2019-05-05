import styled, { StyledComponent } from "@emotion/styled"

/**
 * <MobileNeverContainer>
 *    <span>Stuff</span>
 * </MobileNeverContainer>
 */

export const MobileNeverContainer: StyledComponent<
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
  @media (max-width: 768px) {
    display: none;
  }
`
