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
  onClickFnCall,
  onChangeFnCall,
  simpleSelectorGet,
  simpleSelectorPick
} from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"

export const SimpleNetworkContainer = (props: IDispatchProps & IState) => {
  const FormTag = "SimpleNetwork"
  const fields = ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT"].map(
    (f: string) => `${FormTag}::${f}`
  )
  const filteredsimpleRedux = simpleSelectorPick(props.simpleRedux, fields)
  return (
    <div>
      <H1>Sample Network Component</H1>
      <Pre>simpleRedux: {JSON.stringify(filteredsimpleRedux, null, 2)}</Pre>
      <Pre>
        url: {simpleSelectorGet(props.simpleRedux, [`${FormTag}::url`, "data"])}
      </Pre>
      <InputGroup
        placeholder={"Request URL: http://your.url.com/to/send/a/request/to/"}
        onChange={onChangeFnCall(props.simpleMergeData, `${FormTag}::url`)}
        type={"url"}
      />
      <TextArea
        fill={true}
        onChange={onChangeFnCall(props.simpleMergeData, `${FormTag}::data`)}
        placeholder={"Request Body (JSON or Text)"}
      />
      <ButtonGroup>
        <Button
          onClick={onClickFnCall(
            props.simpleHttpGet,
            `${FormTag}::DELETE`,
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::url`, "data"])
          )}
          intent={Intent.DANGER}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::DELETE`,
            "loading"
          ])}
          text={"DELETE"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleHttpGet,
            `${FormTag}::GET`,
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::url`, "data"])
          )}
          intent={Intent.SUCCESS}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::GET`,
            "loading"
          ])}
          text={"GET"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleHttpHead,
            `${FormTag}::HEAD`,
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::url`, "data"])
          )}
          intent={Intent.NONE}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::HEAD`,
            "loading"
          ])}
          text={"HEAD"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleHttpPatch,
            `${FormTag}::PATCH`,
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::url`, "data"]),
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::data`, "data"])
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::PATCH`,
            "loading"
          ])}
          text={"PATCH"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleHttpPost,
            `${FormTag}::POST`,
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::url`, "data"]),
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::data`, "data"])
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::POST`,
            "loading"
          ])}
          text={"POST"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleHttpPut,
            `${FormTag}::PUT`,
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::url`, "data"]),
            simpleSelectorGet(props.simpleRedux, [`${FormTag}::data`, "data"])
          )}
          intent={Intent.WARNING}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::PUT`,
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
)(SimpleNetworkContainer)
