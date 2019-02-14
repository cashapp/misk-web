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
  getSimpleNetwork,
  querySimpleForm,
  valueSimpleForm,
  querySimpleNetwork,
  onClickFnCall,
  onChangeFnCall
} from "@misk/core"
import * as React from "react"
import { connect } from "react-redux"
import { IDispatchProps, IState, rootDispatcher, rootSelectors } from "../ducks"

export const SampleNetworkContainer = (props: IDispatchProps & IState) => {
  return (
    <div>
      <H1>Sample Network Component</H1>
      <Pre>
        sampleNetwork:
        {JSON.stringify(
          querySimpleNetwork(props.simpleNetwork, "SampleNetwork"),
          null,
          2
        )}
      </Pre>
      <Pre>
        simpleForm:
        {JSON.stringify(
          querySimpleForm(props.simpleForm, "SampleNetwork"),
          null,
          2
        )}
      </Pre>
      <Pre>url: {valueSimpleForm(props.simpleForm, "SampleNetwork::url")}</Pre>
      <InputGroup
        placeholder={"Request URL: http://your.url.com/to/send/a/request/to/"}
        onChange={onChangeFnCall(props.simpleFormInput, ["SampleNetwork::url"])}
        type={"url"}
      />
      <TextArea
        fill={true}
        onChange={onChangeFnCall(props.simpleFormInput, [
          "SampleNetwork::data"
        ])}
        placeholder={"Request Body (JSON or Text)"}
      />
      <ButtonGroup>
        <Button
          onClick={onClickFnCall(props.simpleNetworkGet, [
            "SampleNetwork::DELETE",
            valueSimpleForm(props.simpleForm, "SampleNetwork::url")
          ])}
          intent={Intent.DANGER}
          loading={
            getSimpleNetwork(props.simpleNetwork, "SampleNetwork::DELETE")
              .loading
          }
          text={"DELETE"}
        />
        <Button
          onClick={onClickFnCall(props.simpleNetworkGet, [
            "SampleNetwork::GET",
            valueSimpleForm(props.simpleForm, "SampleNetwork::url")
          ])}
          intent={Intent.SUCCESS}
          loading={
            getSimpleNetwork(props.simpleNetwork, "SampleNetwork::GET").loading
          }
          text={"GET"}
        />
        <Button
          onClick={onClickFnCall(props.simpleNetworkHead, [
            "SampleNetwork::HEAD",
            valueSimpleForm(props.simpleForm, "SampleNetwork::url")
          ])}
          intent={Intent.NONE}
          loading={
            getSimpleNetwork(props.simpleNetwork, "SampleNetwork::HEAD").loading
          }
          text={"HEAD"}
        />
        <Button
          onClick={onClickFnCall(props.simpleNetworkPatch, [
            "SampleNetwork::PATCH",
            valueSimpleForm(props.simpleForm, "SampleNetwork::url"),
            valueSimpleForm(props.simpleForm, "SampleNetwork::data")
          ])}
          intent={Intent.PRIMARY}
          loading={
            getSimpleNetwork(props.simpleNetwork, "SampleNetwork::PATCH")
              .loading
          }
          text={"PATCH"}
        />
        <Button
          onClick={onClickFnCall(props.simpleNetworkPost, [
            "SampleNetwork::POST",
            valueSimpleForm(props.simpleForm, "SampleNetwork::url"),
            valueSimpleForm(props.simpleForm, "SampleNetwork::data")
          ])}
          intent={Intent.PRIMARY}
          loading={
            getSimpleNetwork(props.simpleNetwork, "SampleNetwork::POST").loading
          }
          text={"POST"}
        />
        <Button
          onClick={onClickFnCall(props.simpleNetworkPut, [
            "SampleNetwork::PUT",
            valueSimpleForm(props.simpleForm, "SampleNetwork::url"),
            valueSimpleForm(props.simpleForm, "SampleNetwork::data")
          ])}
          intent={Intent.WARNING}
          loading={
            getSimpleNetwork(props.simpleNetwork, "SampleNetwork::PUT").loading
          }
          text={"PUT"}
        />
      </ButtonGroup>
    </div>
  )
}

const mapStateToProps = (state: IState) => rootSelectors(state)

export default connect(
  mapStateToProps,
  rootDispatcher
)(SampleNetworkContainer)
