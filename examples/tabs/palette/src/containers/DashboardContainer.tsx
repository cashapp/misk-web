import { Navbar, ResponsiveContainer } from "@misk/core"
import * as React from "react"
import styled from "styled-components"
// import { DucksTabContainer as Pallete } from "../containers"

const TabContainer = styled(ResponsiveContainer)`
  position: relative;
  top: 110px;
  padding-left: 5px;
`

export const DashboardContainer = () => {
  return (
    <div>
      <Navbar homeName={"Palette"} />
      <TabContainer>{/* <Pallete /> */}</TabContainer>
    </div>
  )
}
