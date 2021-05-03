import React, { createContext } from "react"
import { Helmet } from "react-helmet"
import { IAdminDashboardConfig, IWebTab } from "src/utilities"

/**
 * <TabLoaderComponent
 *    tabs={adminDashboardTabs}
 * />
 */

export interface ITabLoaderProps {
  tabs: IWebTab[]
  config: IAdminDashboardConfig
}

const RenderTab = (props: IWebTab) => {
  return (
    <>
      <Helmet>
        <script async={true} src={`/_tab/${props.slug}/tab_${props.slug}.js`} />
      </Helmet>
      <div id={props.slug} />
    </>
  )
}

export const AdminDashboardContext = createContext(null)

export const TabLoaderComponent = (props: ITabLoaderProps): JSX.Element => {
  if (props.tabs) {
    return (
      <AdminDashboardContext.Provider value={props.config}>
        {props.tabs.map(tab => (
          <RenderTab key={tab.slug} {...tab} />
        ))}
      </AdminDashboardContext.Provider>
    )
  } else {
    return <div />
  }
}
