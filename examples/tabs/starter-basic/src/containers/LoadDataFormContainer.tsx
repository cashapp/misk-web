import { Button, FormGroup, Intent, InputGroup } from "@blueprintjs/core"
import {
  simpleSelectorGet,
  handler,
  mergeSagaMapKeysToTags
} from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"

interface OwnProps {
  tag: string
}

export const LoadDataFormContainer = (props: IState & IDispatchProps & OwnProps) => {
  const { tag } = props
  const seedData = {
    key: "cars",
    range: [50, 75],
    url: "https://cashapp.github.io/misk-web/examples/data/demo/cars.json"
  }
  const keyTagLookup = {
    key: `${tag}::dataKey`,
    range: `${tag}::dataRange`,
    url: `${tag}::dataUrl`
  }
  return (
    <div>
      <FormGroup>
        <Button
          onClick={handler.simpleMergeData(
            props,
            tag,
            {
              mergeSaga: mergeSagaMapKeysToTags(props, "data", keyTagLookup)
            },
            seedData
          )}
          text={"Use Example Values"}
        />
        <InputGroup
          placeholder={
            "data endpoint URL (example: https://cashapp.github.io/misk-web/examples/data/demo/cars.json"
          }
          onChange={handler.simpleMergeData(props, `${tag}::dataUrl`)}
          value={simpleSelectorGet(
            props.simpleRedux,
            [`${tag}::dataUrl`, "data"],
            ""
          )}
          type={"url"}
        />
        <InputGroup
          placeholder={"network response data object key (example: cars)"}
          onChange={handler.simpleMergeData(props, `${tag}::dataKey`)}
          value={simpleSelectorGet(
            props.simpleRedux,
            [`${tag}::dataKey`, "data"],
            ""
          )}
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
)(LoadDataFormContainer)
