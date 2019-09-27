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
  onChangeFnCall,
  onChangeNumberFnCall,
  onChangeTagFnCall,
  onChangeToggleFnCall,
  onClickFnCall,
  simpleSelectorGet,
  simpleSelectorPick
} from "@misk/simpleredux"
import get from "lodash/get"
import * as React from "react"
import { connect } from "react-redux"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"

export const ExampleFormContainer = (props: IState & IDispatchProps) => {
  const FormTag = "Expense Report"
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
  const fieldsData = simpleSelectorPick(props.simpleForm, fields)
  return (
    <div>
      <H1>Sample Form Component :: {FormTag}</H1>
      <Pre>simpleForm: {JSON.stringify(fieldsData, null, 2)}</Pre>
      <FormGroup>
        <InputGroup
          id="text-input"
          placeholder="Full Name"
          onChange={onChangeFnCall(props.simpleFormInput, `${FormTag}::Name`)}
        />
        <NumericInput
          leftIcon={IconNames.DOLLAR}
          placeholder={"Price"}
          onValueChange={onChangeNumberFnCall(
            props.simpleFormNumber,
            `${FormTag}::Price`
          )}
          value={get(fieldsData, [`${FormTag}::Price`, "data"])}
        />
        <TextArea
          fill={true}
          intent={Intent.PRIMARY}
          onChange={onChangeFnCall(
            props.simpleFormInput,
            `${FormTag}::Itemized Receipt`
          )}
          placeholder={"Itemized Receipt"}
        />
        <FlexContainer>
          <H5>Bill Splitting</H5>
          <Checkbox
            checked={get(fieldsData, [`${FormTag}::CheckAlice`, "data"])}
            label={"Alice"}
            onChange={onChangeToggleFnCall(
              props.simpleFormToggle,
              `${FormTag}::CheckAlice`,
              props.simpleForm
            )}
          />
          <Checkbox
            checked={get(fieldsData, [`${FormTag}::CheckBob`, "data"])}
            label={"Bob"}
            onChange={onChangeToggleFnCall(
              props.simpleFormToggle,
              `${FormTag}::CheckBob`,
              props.simpleForm
            )}
          />
          <Checkbox
            checked={get(fieldsData, [`${FormTag}::CheckEve`, "data"])}
            label={"Eve"}
            onChange={onChangeToggleFnCall(
              props.simpleFormToggle,
              `${FormTag}::CheckEve`,
              props.simpleForm
            )}
          />
          <Checkbox
            checked={get(fieldsData, [`${FormTag}::CheckMallory`, "data"])}
            label={"Mallory"}
            onChange={onChangeToggleFnCall(
              props.simpleFormToggle,
              `${FormTag}::CheckMallory`,
              props.simpleForm
            )}
          />
          <Checkbox
            checked={get(fieldsData, [`${FormTag}::CheckTrent`, "data"])}
            label={"Trent"}
            onChange={onChangeToggleFnCall(
              props.simpleFormToggle,
              `${FormTag}::CheckTrent`,
              props.simpleForm
            )}
          />
        </FlexContainer>
        <RadioGroup
          label="Meal"
          inline={true}
          onChange={onChangeFnCall(props.simpleFormInput, `${FormTag}::Meal`)}
          selectedValue={get(fieldsData, [`${FormTag}::Meal`, "data"])}
        >
          <Radio label="Breakfast" value="breakfast" />
          <Radio label="Lunch" value="lunch" />
          <Radio label="Dinner" value="dinner" />
        </RadioGroup>
        <TagInput
          onChange={onChangeTagFnCall(
            props.simpleFormInput,
            `${FormTag}::Tags`
          )}
          placeholder={"Tags"}
          values={get(fieldsData, [`${FormTag}::Tags`, "data"], [])}
        />
        <H3>Form Submission</H3>
        <Pre>
          submit form network request:{" "}
          {JSON.stringify(
            simpleSelectorGet(props.simpleNetwork, `${FormTag}::POST`),
            null,
            2
          )}
        </Pre>
        <InputGroup
          placeholder={
            "Form POST URL: http://your.url.com/to/send/a/request/to/"
          }
          onChange={onChangeFnCall(
            props.simpleFormInput,
            `${FormTag}::POST_URL`
          )}
          type={"url"}
        />
        <Button
          onClick={onClickFnCall(
            props.simpleNetworkPost,
            `${FormTag}::POST`,
            simpleSelectorGet(props.simpleForm, [
              `${FormTag}::POST_URL`,
              "data"
            ]),
            fieldsData
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleNetwork, [
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
