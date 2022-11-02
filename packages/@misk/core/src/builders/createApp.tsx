import { History } from "history"
import * as React from "react"
import { HistoryRouter as Router } from "redux-first-history/rr6"

export const createApp = (routes: JSX.Element) => {
  return ({ history }: { history: History }) => (
    <Router history={history}>{routes}</Router>
  )
}
