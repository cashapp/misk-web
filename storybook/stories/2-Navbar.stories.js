import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Navbar, Environment } from "@misk/core"

export default {
  title: "Navbar",
  component: Production
}

export const Production = () => (
  <BrowserRouter>
    <Navbar
      environment={Environment.PRODUCTION}
      homeName={"Dino Service"}
      homeUrl={"https://github.com/cashapp"}
      links={[
        {
          name: "First Tab",
          category: "First Category"
        }
      ]}
      navbar_items={["First Item", "Second Item"]}
      status={"Status Text"}
    />
  </BrowserRouter>
)

export const Staging = () => (
  <BrowserRouter>
    <Navbar
      environment={Environment.STAGING}
      homeName={"Dino Service"}
      homeUrl={"https://github.com/cashapp"}
      links={[
        {
          name: "First Tab",
          category: "First Category"
        }
      ]}
      navbar_items={["First Item", "Second Item"]}
      status={"Status Text"}
    />
  </BrowserRouter>
)

export const Development = () => (
  <BrowserRouter>
    <Navbar
      environment={Environment.DEVELOPMENT}
      homeName={"Dino Service"}
      homeUrl={"https://github.com/cashapp"}
      links={[
        {
          name: "First Tab",
          category: "First Category"
        }
      ]}
      navbar_items={["First Item", "Second Item"]}
      status={"Status Text"}
    />
  </BrowserRouter>
)
