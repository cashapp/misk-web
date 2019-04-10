import { Pre } from "@blueprintjs/core"
import { FunctionComponent, HTMLProps } from "react"
import styled, { StyledComponent } from "styled-components"

/**
 * <CodePreContainer>
 *    <span>Stuff</span>
 * </CodePreContainer>
 */
export const CodePreContainer: StyledComponent<
  FunctionComponent<HTMLProps<HTMLElement>>,
  any,
  {},
  never
> = styled(Pre)`
  font-family: Fira Code, Menlo !important;
  white-space: pre-wrap !important; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -pre-wrap !important; /* Opera 4-6 */
  white-space: -o-pre-wrap !important; /* Opera 7 */
  word-wrap: break-word !important; /* Internet Explorer 5.5+ */
`
