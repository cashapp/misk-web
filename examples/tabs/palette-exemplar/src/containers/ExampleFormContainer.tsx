import {
  Button,
  Checkbox,
  H1,
  H3,
  H5,
  FormGroup,
  Intent,
  InputGroup,
  NumericInput,
  Pre,
  RadioGroup,
  Radio,
  TagInput,
  TextArea
} from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { FlexContainer } from "@misk/core"
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

export const ExampleFormContainer = (props: IState & IDispatchProps) => {
  const FormTag = "ExampleForm"
  const fields = [
    "Name",
    "Price",
    "Itemized Receipt",
    "CheckAlice",
    "CheckBob",
    "CheckEve",
    "CheckMallory",
    "CheckTrent",
    "Meal",
    "Tags"
  ].map((f: string) => `${FormTag}::${f}.data`)
  const fieldsData = simpleSelectorPick(props.simpleRedux, fields)
  return (
    <div>
      <H1>Example Form Container :: {FormTag}</H1>
      <Pre>simpleRedux: {JSON.stringify(fieldsData, null, 2)}</Pre>
      <FormGroup>
        <InputGroup
          id="text-input"
          placeholder="Full Name"
          onChange={handler.simpleMergeData(props, `${FormTag}::Name`)}
        />
        <NumericInput
          leftIcon={IconNames.DOLLAR}
          placeholder={"Price"}
          onValueChange={handler.simpleMergeData(props, `${FormTag}::Price`)}
          value={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::Price`,
            "data"
          ])}
        />
        <TextArea
          fill={true}
          intent={Intent.PRIMARY}
          onChange={handler.simpleMergeData(
            props,
            `${FormTag}::Itemized Receipt`
          )}
          placeholder={"Itemized Receipt"}
        />
        <FlexContainer>
          <H5>Bill Splitting</H5>
          <Checkbox
            checked={simpleSelectorGet(props.simpleRedux, [
              `${FormTag}::CheckAlice`,
              "data"
            ])}
            label={"Alice"}
            onChange={handler.simpleMergeToggle(
              props,
              `${FormTag}::CheckAlice`
            )}
          />
          <Checkbox
            checked={simpleSelectorGet(props.simpleRedux, [
              `${FormTag}::CheckBob`,
              "data"
            ])}
            label={"Bob"}
            onChange={handler.simpleMergeToggle(props, `${FormTag}::CheckBob`)}
          />
          <Checkbox
            checked={simpleSelectorGet(props.simpleRedux, [
              `${FormTag}::CheckEve`,
              "data"
            ])}
            label={"Eve"}
            onChange={handler.simpleMergeToggle(props, `${FormTag}::CheckEve`)}
          />
          <Checkbox
            checked={simpleSelectorGet(props.simpleRedux, [
              `${FormTag}::CheckMallory`,
              "data"
            ])}
            label={"Mallory"}
            onChange={handler.simpleMergeToggle(
              props,
              `${FormTag}::CheckMallory`
            )}
          />
          <Checkbox
            checked={simpleSelectorGet(props.simpleRedux, [
              `${FormTag}::CheckTrent`,
              "data"
            ])}
            label={"Trent"}
            onChange={handler.simpleMergeToggle(
              props,
              `${FormTag}::CheckTrent`
            )}
          />
        </FlexContainer>
        <RadioGroup
          label="Meal"
          inline={true}
          onChange={handler.simpleMergeData(props, `${FormTag}::Meal`)}
          selectedValue={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::Meal`,
            "data"
          ])}
        >
          <Radio label="Breakfast" value="breakfast" />
          <Radio label="Lunch" value="lunch" />
          <Radio label="Dinner" value="dinner" />
        </RadioGroup>
        <TagInput
          onChange={handler.simpleMergeData(props, `${FormTag}::Tags`)}
          placeholder={"Tags"}
          values={simpleSelectorGet(
            props.simpleRedux,
            [`${FormTag}::Tags`, "data"],
            []
          )}
        />
        <H3>Form Submission</H3>
        <Pre>
          submit form network request:{" "}
          {JSON.stringify(
            simpleSelectorGet(props.simpleRedux, `${FormTag}::POST`),
            null,
            2
          )}
        </Pre>
        <InputGroup
          placeholder={
            "Form POST URL: http://your.url.com/to/send/a/request/to/"
          }
          onChange={handler.simpleMergeData(props, `${FormTag}::POST_URL`)}
          type={"url"}
        />
        <Button
          onClick={handler.simpleHttpPost(
            props,
            `${FormTag}::POST`,
            simpleSelectorGet(props.simpleRedux, [
              `${FormTag}::POST_URL`,
              "data"
            ]),
            {},
            fieldsData
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${FormTag}::POST`,
            "loading"
          ])}
          text={"POST"}
        />
      </FormGroup>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleFormContainer)
