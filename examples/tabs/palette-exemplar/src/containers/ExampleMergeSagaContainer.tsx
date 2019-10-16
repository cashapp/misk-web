import {
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
  H1,
  Intent,
  Pre
} from "@blueprintjs/core"
import {
  mergeSagaMapKeysToTags,
  simpleSelectorGet,
  simpleSelectorPickTransform,
  handler,
  IDispatchSimpleRedux,
  IDispatchOptions,
  dispatchDefault,
  IAction,
  SIMPLEREDUX,
  ISimpleReduxPayload
} from "@misk/simpleredux"
import { invert } from "lodash"
import * as React from "react"
import { connect } from "react-redux"
import {
  IDispatchProps,
  IState,
  mapStateToProps,
  mapDispatchToProps
} from "src/ducks"

export const failureSagaMapKeysToTags = (
  connectedProps: { simpleMergeData: IDispatchSimpleRedux["simpleMergeData"] },
  keyTagLookup: { [key: string]: string },
  options: IDispatchOptions = dispatchDefault.options
) =>
  function*(action: IAction<SIMPLEREDUX, ISimpleReduxPayload>) {
    for (const tag in keyTagLookup) {
      const value = "uh oh it didn't work!"
      yield connectedProps.simpleMergeData(keyTagLookup[tag], value, options)
    }
  }

export const ExampleMergeSagaContainer = (
  props: IDispatchProps & IState & any
) => {
  const MergeTag = "ExampleMergeSaga"
  // Maintains mapping of keys from the network request keys <=> SimpleRedux tags
  const keyLookup: { [key: string]: string } = {
    alpha: `${MergeTag}::alpha`,
    bravo: `${MergeTag}::bravo`,
    charlie: `${MergeTag}::charlie`,
    delta: `${MergeTag}::delta`,
    echo: `${MergeTag}::echo`,
    foxtrot: `${MergeTag}::foxtrot`,
    gary: `${MergeTag}::gary`
  }
  // faked for now to avoid CORS issues
  const mockedNetworkResponse = {
    data: {
      data: {
        alpha: "alpha PingRequest{message=test}",
        bravo: "bravo",
        charlie: "charlie",
        delta: "delta",
        echo: "echo",
        foxtrot: "foxtrot",
        gary: "gary"
      }
    }
  }

  return (
    <div>
      <H1>Example Merge Saga Container</H1>
      <p>
        Showcase using a custom mergeSaga to seed form fields from a network
        request.
      </p>
      <ButtonGroup>
        <Button
          onClick={handler.simpleMerge(props, `${MergeTag}::test-post`, {
            mergeSaga: mergeSagaMapKeysToTags(props, "data.data", keyLookup),
            overrideArgs: mockedNetworkResponse
          })}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${MergeTag}::test-post`,
            "loading"
          ])}
          text={"Seed Fields"}
        />
        <Button
          onClick={handler.simpleHttpGet(
            props,
            `${MergeTag}::fail-post`,
            "https://adrw.ch/api/404",
            {
              failureSaga: failureSagaMapKeysToTags(props, keyLookup)
            }
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${MergeTag}::fail-post`,
            "loading"
          ])}
          text={"Fail to Seed Fields"}
        />
      </ButtonGroup>
      {/* Fields that will be seeded */}
      <FormGroup>
        {Object.entries(keyLookup).map(([requestKey, reduxTag]) => (
          <InputGroup
            id="text-input"
            placeholder={requestKey}
            onChange={handler.simpleMergeData(props, `${reduxTag}`)}
            value={simpleSelectorGet(
              props.simpleRedux,
              [`${reduxTag}`, "data"],
              ""
            )}
          />
        ))}
      </FormGroup>
      {/* Now submit with edited values! */}
      <Button
        onClick={() => {
          props.simpleMergeData(
            `${MergeTag}::submit`,
            simpleSelectorPickTransform(
              props.simpleRedux,
              Object.values(keyLookup),
              invert(keyLookup),
              "data"
            )
          )
        }}
        intent={Intent.PRIMARY}
        loading={simpleSelectorGet(props.simpleRedux, [
          `${MergeTag}::test-post`,
          "loading"
        ])}
        text={"Submit Form"}
      />
      <Pre>
        {"submit form POST payload: " +
          JSON.stringify(
            simpleSelectorGet(
              props.simpleRedux,
              [`${MergeTag}::submit`, "data"],
              ""
            ),
            null,
            2
          )}
      </Pre>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleMergeSagaContainer)
