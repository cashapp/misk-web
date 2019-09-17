import * as React from "react"
import { Route, Switch } from "react-router"
import { DashboardContainer } from "./containers"

const routes = (
  <span>
    <Switch>
      <Route component={DashboardContainer} />
    </Switch>
  </span>
)

export default routes
