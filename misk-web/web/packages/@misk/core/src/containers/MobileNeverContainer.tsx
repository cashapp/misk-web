import styled from "styled-components"

/**
 * <MobileNeverContainer>
 *    <span>Stuff</span>
 * </MobileNeverContainer>
 */

export const MobileNeverContainer: any = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`
