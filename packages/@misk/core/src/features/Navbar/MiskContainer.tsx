import React, { useEffect, useState } from "react"
import { Spinner } from "@blueprintjs/core"
import { ResponsiveAppContainer } from "src/cssContainers"
import { TabLoaderComponent } from "src/components"
import { INavbarProps, Navbar, choose } from "src/features/Navbar"
import {
  get,
  defaultEnvironment,
  defaultEnvironmentIndicatorsVisible,
  defaultTheme,
  IServiceMetadata,
  IDashboardTab
} from "src/utilities"

export interface IMiskNavbarContainerProps {
  adminDashboardTabsUrl?: string
  children?: any
  loadingSpinner?: boolean
  propsOverrideRemoteData?: boolean
  serviceMetadataUrl?: string
}

export const miskAdminDashboardTabsUrl = "/api/admindashboardtabs"
export const miskServiceMetadataUrl = "/api/service/metadata"
export const testAdminDashboardTabsUrl =
  "https://cashapp.github.io/misk-web/examples/data/demo/adminDashboardTabs.json"
export const testServiceMetadataUrl =
  "https://cashapp.github.io/misk-web/examples/data/demo/serviceMetadata.json"

/**
 * Container for a dashboard Navbar
 * Includes network requests to fill in NavbarProps using Misk service endpoints for
 *  * adminDashboardTabs (links), also used for TabLoaderComponent
 *  * service metadata (environment, homeName, homeUrl, navbar_items, status)
 */
export const MiskNavbarContainer = (
  props: IMiskNavbarContainerProps & INavbarProps
) => {
  const {
    adminDashboardTabsUrl,
    children,
    loadingSpinner = true,
    propsOverrideRemoteData = false,
    serviceMetadataUrl,
    // INavbarProps
    environment = defaultEnvironment,
    environmentBannerVisible = defaultEnvironmentIndicatorsVisible,
    environmentNavbarVisible = defaultEnvironmentIndicatorsVisible,
    error,
    homeName,
    homeUrl,
    linkComponent,
    links,
    menuIcon,
    menuOpenIcon,
    menuButtonAsLink,
    menuShowButton,
    navbar_items,
    status,
    theme = defaultTheme
  } = props

  // State initialization
  const [loading, setLoading] = useState(false)
  const [adminDashboardTabs, setAdminDashboardTabs] = useState(
    [] as IDashboardTab[]
  )
  const [serviceMetadata, setServiceMetadata] = useState({} as IServiceMetadata)

  // Network calls to get adminDashboardTabs and serviceMetadata
  const getAdminDashboardTabs = async () => {
    const { data, error } = await get(adminDashboardTabsUrl)
    if (error) {
      console.error(`Failed to GET ${adminDashboardTabsUrl}`, error)
      setLoading(true)
    } else {
      setAdminDashboardTabs(data.adminDashboardTabs)
      setLoading(false)
    }
  }

  const getServiceMetadata = async () => {
    const { data, error } = await get(serviceMetadataUrl)
    if (error) {
      console.error(`Failed to GET ${serviceMetadataUrl}`, error)
      setLoading(true)
    } else {
      setServiceMetadata(data.serviceMetadata)
    }
  }

  useEffect(() => {
    if (adminDashboardTabsUrl) {
      setLoading(true)
      getAdminDashboardTabs()
    }
    if (serviceMetadataUrl) {
      setLoading(true)
      getServiceMetadata()
    }
  }, [])

  return (
    <>
      <Navbar
        environment={choose(
          propsOverrideRemoteData,
          environment,
          serviceMetadata.environment
        )}
        environmentBannerVisible={environmentBannerVisible}
        environmentNavbarVisible={environmentNavbarVisible}
        error={error}
        homeName={choose(
          propsOverrideRemoteData,
          homeName,
          serviceMetadata.app_name
        )}
        homeUrl={choose(
          propsOverrideRemoteData,
          homeUrl,
          serviceMetadata.admin_dashboard_url
        )}
        linkComponent={linkComponent}
        links={choose(propsOverrideRemoteData, links, adminDashboardTabs)}
        menuIcon={menuIcon}
        menuOpenIcon={menuOpenIcon}
        menuButtonAsLink={menuButtonAsLink}
        menuShowButton={menuShowButton}
        navbar_items={choose(
          propsOverrideRemoteData,
          navbar_items,
          serviceMetadata.navbar_items
        )}
        status={choose(
          propsOverrideRemoteData,
          status,
          serviceMetadata.navbar_status
        )}
        theme={theme}
      />
      <ResponsiveAppContainer>
        {loadingSpinner && loading && <Spinner />}
        <TabLoaderComponent tabs={adminDashboardTabs} />
        {children}
      </ResponsiveAppContainer>
    </>
  )
}
