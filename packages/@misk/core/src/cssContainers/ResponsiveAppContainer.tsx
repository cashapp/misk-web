import styled, { StyledComponent } from "@emotion/styled"

/**
 * <ResponsiveAppContainer>
 *    <span>Stuff</span>
 * </ResponsiveAppContainer>
 */
// TODO Fix this so it isn't copying in styles from ResponsiveContainer
export const ResponsiveAppContainer: StyledComponent<
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
  position: relative;
  top: 110px;
  padding-left: 5px;

  margin: 0 auto;
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`
