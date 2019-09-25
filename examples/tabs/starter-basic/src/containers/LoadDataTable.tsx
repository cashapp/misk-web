import { Intent, ProgressBar, Slider } from "@blueprintjs/core"
import { Table } from "@misk/core"
import { simpleSelectorGet } from "@misk/simpleredux"
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

export const LoadDataTable = (props: IState & IDispatchProps & OwnProps) => {
  const { tag } = props
  const responseData = simpleSelectorGet(
    props.simpleRedux,
    [
      `${tag}::dataRequest`,
      "data",
      simpleSelectorGet(props.simpleRedux, [`${tag}::dataKey`, "data"])
    ],
    []
  )
  const responseDataLength = responseData.length
  const stepSize = Math.round(responseDataLength / 100)
  const labelStepSize = Math.max(1, Math.round(stepSize * 4))
  return (
    <div>
      {responseDataLength == 0 ? (
        <ProgressBar animate={true} stripes={true} intent={Intent.NONE} />
      ) : (
        <Slider
          stepSize={stepSize}
          labelStepSize={labelStepSize}
          max={responseDataLength}
          onChange={(value: number) =>
            props.simpleMergeData(`${tag}::dataMaxRows`, value)
          }
          onRelease={(value: number) =>
            props.simpleMergeData(`${tag}::dataMaxRows`, value)
          }
          value={simpleSelectorGet(props.simpleRedux, [
            `${tag}::dataMaxRows`,
            "data"
          ])}
        />
      )}

      <Table
        data={simpleSelectorGet(
          props.simpleRedux,
          [
            `${tag}::dataRequest`,
            "data",
            simpleSelectorGet(props.simpleRedux, [`${tag}::dataKey`, "data"])
          ],
          []
        )}
        maxRows={simpleSelectorGet(props.simpleRedux, [
          `${tag}::dataMaxRows`,
          "data"
        ])}
      />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadDataTable)
