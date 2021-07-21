/** @jsx jsx */
import { Callout, ICalloutProps } from "@blueprintjs/core"
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"

/**
 * <ErrorCalloutComponent error={props.error}/>
 */

export interface IError {
  [key: string]: any
}

export interface IErrorCalloutProps {
  error?: IError
}

const ErrorCallout = (props: ICalloutProps) => (
  <Callout css={css({ margin: "20px 0" })} {...props} />
)

const RawError = styled.pre`
  text-align: left;
`

const generateStatus = (props: IErrorCalloutProps) => {
  try {
    return `[${props.error.response.status}] `
  } catch (error) {
    return "[Error]"
  }
}

const generateDescription = (props: IErrorCalloutProps) => {
  try {
    const statusText = props.error.response.statusText
      ? `${props.error.response.statusText}. `
      : ""
    const data = props.error.response.data
      ? `${props.error.response.data}. `
      : ""
    return statusText + data
  } catch (error) {
    return ""
  }
}

const generateUrl = (props: IErrorCalloutProps) => {
  try {
    return `[URL] ${props.error.config.url}`
  } catch (error) {
    return ""
  }
}

export const ErrorCalloutComponent = (props: IErrorCalloutProps) => {
  if (props.error) {
    return (
      <ErrorCallout
        title={`${generateStatus(props)} ${generateDescription(props)}`}
        intent="danger"
      >
        {generateUrl(props)}
        <RawError>{JSON.stringify(props.error, null, 2)}</RawError>
      </ErrorCallout>
    )
  } else {
    return <span />
  }
}
