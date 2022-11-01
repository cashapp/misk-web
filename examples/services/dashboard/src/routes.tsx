import * as React from "react"
import { Route, Routes } from "react-router"
import { DashboardContainer } from "./containers"

const routes = (
  <Routes>
    <Route>
      <DashboardContainer />
    </Route>
  </Routes>
)

export default routes
