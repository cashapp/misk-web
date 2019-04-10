import { FunctionComponent, HTMLProps } from "react"
import styled, { StyledComponent } from "styled-components"

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
  FunctionComponent<HTMLProps<HTMLElement>>,
  any,
  {},
  never
> = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 320px;
`
