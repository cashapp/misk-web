import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

export const createApp = (routes: JSX.Element) => {
  return () => <Router>{routes}</Router>
}
