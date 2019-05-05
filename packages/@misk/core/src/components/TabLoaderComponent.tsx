import * as React from "react"
import Helmet from "react-helmet"
import { IWebTab } from "../utilities"

/**
 * <TabLoaderComponent
 *    tabs={adminDashboardTabs}
 * />
 */

export interface ITabLoaderProps {
  tabs: IWebTab[]
}

const RenderTab = (props: IWebTab) => {
  return (
    <span>
      <Helmet>
        <script async={true} src={`/_tab/${props.slug}/tab_${props.slug}.js`} />
      </Helmet>
      <div id={props.slug} />
    </span>
  )
}

export const TabLoaderComponent = (props: ITabLoaderProps): JSX.Element => {
  if (props.tabs) {
    return (
      <div>
        {props.tabs.map(tab => (
          <RenderTab key={tab.slug} {...tab} />
        ))}
      </div>
    )
  } else {
    return <div />
  }
}
