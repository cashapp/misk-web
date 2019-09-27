import {
  Button,
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
  handler
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
  const networkResponse = {
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
      <Button
        onClick={handler.simpleMerge(
          props,
          `${MergeTag}::test-post`,
          {
            mergeSaga: mergeSagaMapKeysToTags(props, "data.data", keyLookup)
          },
          networkResponse
        )}
        intent={Intent.PRIMARY}
        loading={simpleSelectorGet(props.simpleRedux, [
          `${MergeTag}::test-post`,
          "loading"
        ])}
        text={"Seed Fields"}
      />
      {/* Fields that will be seeded */}
      <FormGroup>
        {Object.entries(keyLookup).map(([requestKey, reduxTag]) => (
          <InputGroup
            id="text-input"
            placeholder={requestKey}
            onChange={handler.simpleMergeData(props, `${reduxTag}`)}
            value={simpleSelectorGet(props.simpleRedux, [
              `${reduxTag}`,
              "data"
            ])}
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
