import styled, { StyledComponent } from "@emotion/styled"

/**
 * <FlexContainer>
 *  <ColumnContainer>
 *    <span>Column 1</span>
 *  </ColumnContainer>
 *  <ColumnContainer>
 *    <span>Column 2</span>
 *  </ColumnContainer>
 * </FlexContainer>
 */
export const ColumnContainer: StyledComponent<
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
  flex-grow: 1;
  flex-basis: 0;
  min-width: 320px;
`
