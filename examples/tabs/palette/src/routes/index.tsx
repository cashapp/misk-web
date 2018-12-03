import * as React from "react"
import { Route, Switch } from "react-router"
import { DashboardContainer, DucksTabContainer } from "../containers"

const routes = (
  <div>
    <Switch>
      <Route path="/dashboard/palette/" component={DashboardContainer} />
      <Route path="/palette/" component={DucksTabContainer} />
      <Route path="/_tab/palette/" component={DucksTabContainer} />
      <Route
        path="/misk-web/examples/services/dashboard/demo/palette/"
        component={DucksTabContainer}
      />
      {/* Do not include a Route without a path or it will display during on all tabs */}
    </Switch>
  </div>
)

export default routes
