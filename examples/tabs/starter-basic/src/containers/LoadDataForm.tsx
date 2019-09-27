import { Button, FormGroup, Intent, InputGroup } from "@blueprintjs/core"
import { simpleSelectorGet, handler } from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"

interface OwnProps {
  tag: String
}

export const LoadDataForm = (props: IState & IDispatchProps & OwnProps) => {
  const { tag } = props
  return (
    <div>
      <FormGroup>
        <Button
          onClick={() => {
            props.simpleMergeData(`${tag}::dataKey`, "cars")
            props.simpleMergeData(
              `${tag}::dataUrl`,
              "https://cashapp.github.io/misk-web/examples/data/demo/cars.json"
            )
            props.simpleMergeData(`${tag}::dataRange`, [50, 75])
          }}
          text={"Use Example Values"}
        />
        <InputGroup
          placeholder={
            "data endpoint URL (example: https://cashapp.github.io/misk-web/examples/data/demo/cars.json"
          }
          onChange={handler.simpleMergeData(props, `${tag}::dataUrl`)}
          value={simpleSelectorGet(props.simpleRedux, [
            `${tag}::dataUrl`,
            "data"
          ])}
          type={"url"}
        />
        <InputGroup
          placeholder={"network response data object key (example: cars)"}
          onChange={handler.simpleMergeData(props, `${tag}::dataKey`)}
          value={simpleSelectorGet(props.simpleRedux, [
            `${tag}::dataKey`,
            "data"
          ])}
        />
        <Button
          onClick={handler.simpleHttpGet(
            props,
            `${tag}::dataRequest`,
            simpleSelectorGet(props.simpleRedux, [`${tag}::dataUrl`, "data"])
          )}
          intent={Intent.PRIMARY}
          loading={simpleSelectorGet(props.simpleRedux, [
            `${tag}::dataRequest`,
            "loading"
          ])}
          text={"GET Data"}
        />
      </FormGroup>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadDataForm)
