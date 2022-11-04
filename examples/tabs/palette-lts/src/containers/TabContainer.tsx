import { Table } from "@misk/core"
import { simpleSelectorGet } from "@misk/simpleredux"
import React, {useEffect} from "react"
import { connect } from "react-redux"
import { ExampleFormContainer, ExampleNetworkContainer } from "src/containers"
import {
  IDispatchProps,
  IState,
  mapDispatchToProps,
  mapStateToProps
} from "src/ducks"
import { HowToComponent, ExampleRouterComponent } from "src/components"

const TabContainer = (props: IState & IDispatchProps) => {
  const tableTag = "Cars"
  const tableUrl =
    "https://cashapp.github.io/misk-web/examples/data/demo/cars.json"

  useEffect(() =>{
      props.simpleNetworkGet(tableTag, tableUrl)
  }, [])

return (
  <div>
    <HowToComponent />
    <Table
      data={simpleSelectorGet(
        props.simpleNetwork,
        [tableTag, "data", "cars"],
        []
      )}
      range={[0, 5]}
    />
    <ExampleNetworkContainer />
    <ExampleFormContainer />
    <ExampleRouterComponent />
  </div>
)

}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
