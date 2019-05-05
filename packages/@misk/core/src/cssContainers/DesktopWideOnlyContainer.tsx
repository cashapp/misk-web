import styled, { StyledComponent } from "@emotion/styled"

/**
 * <DesktopWideOnlyContainer.1>
 *    <span>Stuff</span>
 * </DesktopWideOnlyContainer.1>
 */

export const DesktopWideOnlyContainer: StyledComponent<
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
  @media (max-width: 1200px) {
    display: none;
  }
`
