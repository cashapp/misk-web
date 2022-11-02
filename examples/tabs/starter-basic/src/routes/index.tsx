import * as React from "react"
import { Route, Routes } from "react-router"
import { TabContainer } from "src/containers"

const routes = (
  <Routes>
    <Route path="/_admin/starter-basic/">
      <TabContainer />
    </Route>
    {/* Do not include a Route without a path or it will display during on all tabs */}
    <Route>
      <TabContainer />
    </Route>
  </Routes>
)

export default routes
