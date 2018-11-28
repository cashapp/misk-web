import * as React from "react"
import { Route, Switch } from "react-router"
import { DashboardContainer, TabContainer } from "../containers"

const routes = (
  <div>
    <Switch>
      <Route path="/dashboard/palette/" component={DashboardContainer} />
      <Route path="/palette/" component={TabContainer} />
      <Route path="/_tab/palette/" component={TabContainer} />
      <Route path="/misk-web/examples/services/dashboard/demo/palette/" component={TabContainer} />
      {/* Do not include a Route without a path or it will display during on all tabs */}
    </Switch>
  </div>
)

export default routes
