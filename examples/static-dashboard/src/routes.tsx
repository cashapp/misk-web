import * as React from "react"
import { Route, Switch } from "react-router"
import { TabContainer } from "./containers"

const routes = (
  <span>
    <Switch>
      <Route component={TabContainer} />
    </Switch>
  </span>
)

export default routes
