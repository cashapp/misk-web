import * as React from "react"
import { connect } from "react-redux"
import { HowToComponent } from "src/components"
import { LoadDataFormContainer, LoadDataTableContainer } from "src/containers"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps,
} from "src/ducks"

const TabContainer = (props: IState & IDispatchProps) => {
  const tag = "LoadData"
  return (
    <div>
      <HowToComponent />
      <LoadDataFormContainer tag={tag} />
      <LoadDataTableContainer tag={tag} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
