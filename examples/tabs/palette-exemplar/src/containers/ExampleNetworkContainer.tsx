import {
  ButtonGroup,
  Button,
  InputGroup,
  TextArea,
  H1,
  Intent,
  Pre
} from "@blueprintjs/core"
import {
  simpleSelectorGet,
  simpleSelectorPick,
  handler
} from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"

export const ExampleNetworkContainer = (props: IDispatchProps & IState) => {
  const NetworkTag = "ExampleNetwork"
  const fields = ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT"].map(
    (f: string) => `${NetworkTag}::${f}`
  )
  const filteredsimpleRedux = simpleSelectorPick(props.simpleRedux, fields)
  return (
    <div>
      <H1>Example Network Container</H1>
      <Pre>simpleRedux: {JSON.stringify(filteredsimpleRedux, null, 2)}</Pre>
      <Pre>
        url:{" "}
        {simpleSelectorGet(props.simpleRedux, [`${NetworkTag}::url`, "data"])}
      </Pre>
      <InputGroup
        placeholder={"Request URL: http://your.url.com/to/send/a/request/to/"}
        onChange={handler.simpleMergeData(props, `${NetworkTag}::url`)}
        type={"url"}
      />
      <TextArea
        fill={true}
        onChange={handler.simpleMergeData(props, `${NetworkTag}::data`)}
        placeholder={"Request Body (JSON or Text)"}
      />
      <ButtonGroup>
        <Button
          onClick={handler.simpleHttpDelete(
            props,
            `${NetworkTag}::DELETE`,
            simpleSelectorGet(props.simpleRedux, [`${NetworkTag}::url`, "data"])
          )}
          intent={Intent.DANGER}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${NetworkTag}::DELETE`,
            "loading"
          ])}
          text={"DELETE"}
        />
        <Button
          onClick={handler.simpleHttpGet(
            props,
            `${NetworkTag}::GET`,
            simpleSelectorGet(props.simpleRedux, [`${NetworkTag}::url`, "data"])
          )}
          intent={Intent.SUCCESS}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${NetworkTag}::GET`,
            "loading"
          ])}
          text={"GET"}
        />
        <Button
          onClick={handler.simpleHttpHead(
            props,
            `${NetworkTag}::HEAD`,
            simpleSelectorGet(props.simpleRedux, [`${NetworkTag}::url`, "data"])
          )}
          intent={Intent.NONE}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${NetworkTag}::HEAD`,
            "loading"
          ])}
          text={"HEAD"}
        />
        <Button
          onClick={handler.simpleHttpPatch(
            props,
            `${NetworkTag}::PATCH`,
            simpleSelectorGet(props.simpleRedux, [
              `${NetworkTag}::url`,
              "data"
            ]),
            {
              overrideArgs: simpleSelectorGet(props.simpleRedux, [
                `${NetworkTag}::data`,
                "data"
              ])
            }
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${NetworkTag}::PATCH`,
            "loading"
          ])}
          text={"PATCH"}
        />
        <Button
          onClick={handler.simpleHttpPost(
            props,
            `${NetworkTag}::POST`,
            simpleSelectorGet(props.simpleRedux, [
              `${NetworkTag}::url`,
              "data"
            ]),
            {
              overrideArgs: simpleSelectorGet(props.simpleRedux, [
                `${NetworkTag}::data`,
                "data"
              ])
            }
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${NetworkTag}::POST`,
            "loading"
          ])}
          text={"POST"}
        />
        <Button
          onClick={handler.simpleHttpPut(
            props,
            `${NetworkTag}::PUT`,

            simpleSelectorGet(props.simpleRedux, [
              `${NetworkTag}::url`,
              "data"
            ]),
            {
              overrideArgs: simpleSelectorGet(props.simpleRedux, [
                `${NetworkTag}::data`,
                "data"
              ])
            }
          )}
          intent={Intent.WARNING}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${NetworkTag}::PUT`,
            "loading"
          ])}
          text={"PUT"}
        />
      </ButtonGroup>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleNetworkContainer)
