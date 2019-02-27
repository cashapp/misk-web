import styled from "styled-components"

/**
 * <FlexContainer>
 *    <span>Stuff</span>
 * </FlexContainer>
 */

export const FlexContainer: any = styled.div`
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
