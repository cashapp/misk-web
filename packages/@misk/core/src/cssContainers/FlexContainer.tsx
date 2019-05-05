import styled, { StyledComponent } from "@emotion/styled"

/**
 * <FlexContainer>
 *    <span>Stuff</span>
 * </FlexContainer>
 */

export const FlexContainer: StyledComponent<
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  * {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
