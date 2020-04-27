import * as React from "react"
import { Helmet } from "react-helmet"
import { IWebTab } from "src/utilities"

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
    <>
      <Helmet>
        <script async={true} src={`/_tab/${props.slug}/tab_${props.slug}.js`} />
      </Helmet>
      <div id={props.slug} />
    </>
  )
}

export const TabLoaderComponent = (props: ITabLoaderProps): JSX.Element => {
  if (props.tabs) {
    return (
      <>
        {props.tabs.map(tab => (
          <RenderTab key={tab.slug} {...tab} />
        ))}
      </>
    )
  } else {
    return <div />
  }
}
