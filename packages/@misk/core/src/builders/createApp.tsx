import { History } from "history"
import * as React from "react"
import { Router } from "react-router-dom"

export const createApp = (routes: JSX.Element) => {
  return ({ history }: { history: History }) => (
    <Router history={history}>{routes}</Router>
  )
}
