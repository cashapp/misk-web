import * as React from "react"
import { Route, Routes } from "react-router"
import { TabContainer } from "src/containers"

const routes = (
  <Routes>
    <Route path="/_admin/{{name}}/">
      <TabContainer />
    </Route>
    {/* Do not include a Route without a path or it will display during on all tabs: */}
    {/* <Route component={TabContainer} /> */}
  </Routes>
)

export default routes
