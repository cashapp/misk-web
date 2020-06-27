import React from "react"
import { BrowserRouter } from "react-router-dom"
import { action } from "@storybook/addon-actions"
import { Navbar, Environment } from "@misk/core"

export const Production = () => (
  <BrowserRouter>
    <Navbar
      environment={Environment.PRODUCTION}
      homeName={"Dino Service"}
      homeUrl={"https://github.com/cashapp"}
      links={[
        {
          name: "First Tab",
          slug: "first-tab",
          url_path_prefix: "/first-tab/",
          category: "Demo"
        },
        {
          name: "Second Tab",
          slug: "second-tab",
          url_path_prefix: "/second-tab/",
          category: "Demo"
        }
      ]}
      navbar_items={[
        <a onClick={action('click-first-item')}>First Item</a>, 
        "Second Item"
      ]}
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
          slug: "first-tab",
          url_path_prefix: "/first-tab/",
          category: "Demo"
        },
        {
          name: "Second Tab",
          slug: "second-tab",
          url_path_prefix: "/second-tab/",
          category: "Demo"
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
          slug: "first-tab",
          url_path_prefix: "/first-tab/",
          category: "Demo"
        },
        {
          name: "Second Tab",
          slug: "second-tab",
          url_path_prefix: "/second-tab/",
          category: "Demo"
        }
      ]}
      navbar_items={["First Item", "Second Item"]}
      status={"Status Text"}
    />
  </BrowserRouter>
)

export default {
  title: "Navbar",
  component: Production
}