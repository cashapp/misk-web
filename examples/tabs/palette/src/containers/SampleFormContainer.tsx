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
import {
  FlexContainer,
  querySimpleForm,
  querySimpleFormData,
  onChangeFnCall,
  onChangeNumberFnCall,
  valueSimpleForm,
  valueSimpleFormTags,
  onChangeTagFnCall,
  onChangeToggleFnCall,
  onClickFnCall,
  getSimpleNetwork
} from "@misk/core"
import * as React from "react"
import { connect } from "react-redux"
import { IState, rootDispatcher, rootSelectors, IDispatchProps } from "../ducks"

export const SampleFormContainer = (props: IState & IDispatchProps) => {
  const FormTag = "Expense Report"
  return (
    <div>
      <H1>Sample Form Component :: {FormTag}</H1>
      <Pre>
        raw form input:{" "}
        {JSON.stringify(querySimpleForm(props.simpleForm, FormTag), null, 2)}
      </Pre>
      <FormGroup>
        <InputGroup
          id="text-input"
          placeholder="Full Name"
          onChange={onChangeFnCall(props.simpleFormInput, [`${FormTag}::Name`])}
        />
        <NumericInput
          leftIcon={IconNames.DOLLAR}
          placeholder={"Price"}
          onValueChange={onChangeNumberFnCall(props.simpleFormNumber, [
            `${FormTag}::Price`
          ])}
          value={valueSimpleForm(props.simpleForm, `${FormTag}::Price`)}
        />
        <TextArea
          fill={true}
          intent={Intent.PRIMARY}
          onChange={onChangeFnCall(props.simpleFormInput, [
            `${FormTag}::Itemized Receipt`
          ])}
          placeholder={"Itemized Receipt"}
        />
        <FlexContainer>
          <H5>Bill Splitting</H5>
          <Checkbox
            checked={valueSimpleForm(
              props.simpleForm,
              `${FormTag}::CheckAlice`
            )}
            label={"Alice"}
            onChange={onChangeToggleFnCall(props.simpleFormToggle, [
              `${FormTag}::CheckAlice`,
              props.simpleForm
            ])}
          />
          <Checkbox
            checked={valueSimpleForm(props.simpleForm, `${FormTag}::CheckBob`)}
            label={"Bob"}
            onChange={onChangeToggleFnCall(props.simpleFormToggle, [
              `${FormTag}::CheckBob`,
              props.simpleForm
            ])}
          />
          <Checkbox
            checked={valueSimpleForm(props.simpleForm, `${FormTag}::CheckEve`)}
            label={"Eve"}
            onChange={onChangeToggleFnCall(props.simpleFormToggle, [
              `${FormTag}::CheckEve`,
              props.simpleForm
            ])}
          />
          <Checkbox
            checked={valueSimpleForm(
              props.simpleForm,
              `${FormTag}::CheckMallory`
            )}
            label={"Mallory"}
            onChange={onChangeToggleFnCall(props.simpleFormToggle, [
              `${FormTag}::CheckMallory`,
              props.simpleForm
            ])}
          />
          <Checkbox
            checked={valueSimpleForm(
              props.simpleForm,
              `${FormTag}::CheckTrent`
            )}
            label={"Trent"}
            onChange={onChangeToggleFnCall(props.simpleFormToggle, [
              `${FormTag}::CheckTrent`,
              props.simpleForm
            ])}
          />
        </FlexContainer>
        <RadioGroup
          label="Meal"
          inline={true}
          onChange={onChangeFnCall(props.simpleFormInput, [`${FormTag}::Meal`])}
          selectedValue={valueSimpleForm(props.simpleForm, `${FormTag}::Meal`)}
        >
          <Radio label="Breakfast" value="breakfast" />
          <Radio label="Lunch" value="lunch" />
          <Radio label="Dinner" value="dinner" />
        </RadioGroup>
        <TagInput
          onChange={onChangeTagFnCall(props.simpleFormInput, [
            `${FormTag}::Tags`
          ])}
          placeholder={"Tags"}
          values={valueSimpleFormTags(props.simpleForm, `${FormTag}::Tags`)}
        />
        <H3>Form Submission</H3>
        <Pre>
          submit form network request:{" "}
          {JSON.stringify(
            getSimpleNetwork(props.simpleNetwork, `${FormTag}::POST`),
            null,
            2
          )}
        </Pre>
        <InputGroup
          placeholder={
            "Form POST URL: http://your.url.com/to/send/a/request/to/"
          }
          onChange={onChangeFnCall(props.simpleFormInput, [
            `${FormTag}::POST_URL`
          ])}
          type={"url"}
        />
        <Button
          onClick={onClickFnCall(props.simpleNetworkPost, [
            `${FormTag}::POST`,
            valueSimpleForm(props.simpleForm, `${FormTag}::POST_URL`),
            querySimpleFormData(props.simpleForm, FormTag)
          ])}
          intent={Intent.PRIMARY}
          loading={
            getSimpleNetwork(props.simpleForm, `${FormTag}::POST`).loading
          }
          text={"POST"}
        />
      </FormGroup>
    </div>
  )
}

const mapStateToProps = (state: IState) => rootSelectors(state)

export default connect(
  mapStateToProps,
  rootDispatcher
)(SampleFormContainer)
