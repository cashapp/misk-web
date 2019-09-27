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
  simpleSelect,
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

export const ExampleNetworkContainer = (props: IDispatchProps & IState) => {
  const FormTag = "SampleNetwork"
  const fields = ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT"].map(
    (f: string) => `${FormTag}::${f}`
  )
  const filteredSimpleNetwork = simpleSelectorPick(props.simpleNetwork, fields)
  return (
    <div>
      <H1>Example Network Component</H1>
      <Pre>simpleNetwork: {JSON.stringify(filteredSimpleNetwork, null, 2)}</Pre>
      <Pre>
        simpleForm:
        {JSON.stringify(
          simpleSelect(props.simpleForm, "SampleNetwork"),
          null,
          2
        )}
      </Pre>
      <Pre>
        url: {simpleSelect(props.simpleForm, "SampleNetwork::url", "data")}
      </Pre>
      <InputGroup
        placeholder={"Request URL: http://your.url.com/to/send/a/request/to/"}
        onChange={onChangeFnCall(props.simpleFormInput, "SampleNetwork::url")}
        type={"url"}
      />
      <TextArea
        fill={true}
        onChange={onChangeFnCall(props.simpleFormInput, "SampleNetwork::data")}
        placeholder={"Request Body (JSON or Text)"}
      />
      <ButtonGroup>
        <Button
          onClick={onClickFnCall(
            props.simpleNetworkGet,
            "SampleNetwork::DELETE",
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::url", "data"])
          )}
          intent={Intent.DANGER}
          loading={simpleSelectorGet(props.simpleNetwork, [
            "SampleNetwork::DELETE",
            "loading"
          ])}
          text={"DELETE"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleNetworkGet,
            "SampleNetwork::GET",
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::url", "data"])
          )}
          intent={Intent.SUCCESS}
          loading={simpleSelectorGet(props.simpleNetwork, [
            "SampleNetwork::GET",
            "loading"
          ])}
          text={"GET"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleNetworkHead,
            "SampleNetwork::HEAD",
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::url", "data"])
          )}
          intent={Intent.NONE}
          loading={simpleSelectorGet(props.simpleNetwork, [
            "SampleNetwork::HEAD",
            "loading"
          ])}
          text={"HEAD"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleNetworkPatch,
            "SampleNetwork::PATCH",
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::url", "data"]),
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::data", "data"])
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleNetwork, [
            "SampleNetwork::PATCH",
            "loading"
          ])}
          text={"PATCH"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleNetworkPost,
            "SampleNetwork::POST",
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::url", "data"]),
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::data", "data"])
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleNetwork, [
            "SampleNetwork::POST",
            "loading"
          ])}
          text={"POST"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleNetworkPut,
            "SampleNetwork::PUT",
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::url", "data"]),
            simpleSelectorGet(props.simpleForm, ["SampleNetwork::data", "data"])
          )}
          intent={Intent.WARNING}
          loading={simpleSelectorGet(props.simpleNetwork, [
            "SampleNetwork::PUT",
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
