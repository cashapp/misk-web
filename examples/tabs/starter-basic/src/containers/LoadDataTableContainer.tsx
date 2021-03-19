import { Intent, ProgressBar, RangeSlider } from "@blueprintjs/core"
import { Table } from "@misk/core"
import { simpleSelectorGet, handler } from "@misk/simpleredux"
import * as React from "react"
import { connect } from "react-redux"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps,
} from "src/ducks"

interface OwnProps {
  tag: string
}

export const LoadDataTableContainer = (
  props: IState & IDispatchProps & OwnProps
) => {
  const { tag } = props
  const responseData = simpleSelectorGet(
    props.simpleRedux,
    [
      `${tag}::dataRequest`,
      "data",
      simpleSelectorGet(props.simpleRedux, [`${tag}::dataKey`, "data"]),
    ],
    []
  )
  const responseDataLength = responseData.length
  const labelStepSize = Math.max(1, Math.round(responseDataLength / 25))
  return (
    <div>
      {responseDataLength == 0 ? (
        <ProgressBar animate={false} stripes={true} intent={Intent.NONE} />
      ) : (
        <RangeSlider
          labelStepSize={labelStepSize}
          max={responseDataLength}
          onChange={handler.simpleMergeData(props, `${tag}::dataRange`)}
          onRelease={handler.simpleMergeData(props, `${tag}::dataRange`)}
          value={simpleSelectorGet(props.simpleRedux, [
            `${tag}::dataRange`,
            "data",
          ])}
        />
      )}

      <Table
        data={simpleSelectorGet(
          props.simpleRedux,
          [
            `${tag}::dataRequest`,
            "data",
            simpleSelectorGet(props.simpleRedux, [`${tag}::dataKey`, "data"]),
          ],
          []
        )}
        range={simpleSelectorGet(props.simpleRedux, [
          `${tag}::dataRange`,
          "data",
        ])}
      />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadDataTableContainer)
