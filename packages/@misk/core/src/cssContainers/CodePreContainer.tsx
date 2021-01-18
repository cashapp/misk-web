/** @jsx jsx */
import { IElementRefProps, Pre } from "@blueprintjs/core"
import { css, jsx } from "@emotion/react"
import * as React from "react"

/**
 * <CodePreContainer>
 *    <span>Stuff</span>
 * </CodePreContainer>
 */

export const CodePreContainer = (
  props: React.HTMLProps<HTMLElement> & IElementRefProps<HTMLElement>
) => (
  <Pre
    css={css`
      font-family: Fira Code, Menlo !important;
      white-space: pre-wrap !important; /* Since CSS 2.1 */
      white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
      white-space: -pre-wrap !important; /* Opera 4-6 */
      white-space: -o-pre-wrap !important; /* Opera 7 */
      word-wrap: break-word !important; /* Internet Explorer 5.5+ */
    `}
    {...props}
  />
)
