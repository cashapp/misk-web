import { Spinner } from "@blueprintjs/core"
import React, { useEffect, useState } from "react"
import { ResponsiveAppContainer } from "src/cssContainers"
import { TabLoaderComponent } from "src/components"
import { INavbarProps, Navbar, choose } from "src/features/Navbar"
import {
  get,
  defaultEnvironment,
  defaultEnvironmentIndicatorsVisible,
  defaultTheme,
  IServiceMetadata,
  IDashboardMetadata
} from "src/utilities"

export interface IMiskNavbarContainerProps {
  children?: any
  dashboardMetadataUrl?: string
  loadingSpinner?: boolean
  propsOverrideRemoteData?: boolean
  serviceMetadataUrl?: string
}

export const miskDashboardMetadataUrl = (dashboardSlug: string) =>
  `/api/dashboard/${dashboardSlug}/metadata`
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
    dashboardMetadataUrl,
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
    navbarItemsToDisplay = null,
    status,
    theme = defaultTheme
  } = props

  // State initialization
  const [loading, setLoading] = useState(false)
  const [dashboardMetadata, setDashboardMetadata] = useState(
    {} as IDashboardMetadata
  )
  const [serviceMetadata, setServiceMetadata] = useState({} as IServiceMetadata)

  // Network calls to get dashboardMetadata and serviceMetadata
  const getDashboardMetadata = async () => {
    const { data, error } = await get(dashboardMetadataUrl)
    if (error) {
      console.error(`Failed to GET ${dashboardMetadataUrl}`, error)
      setLoading(true)
    } else {
      setDashboardMetadata(data.dashboardMetadata)
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
    if (dashboardMetadataUrl) {
      setLoading(true)
      getDashboardMetadata()
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
          dashboardMetadata.home_url
        )}
        linkComponent={linkComponent}
        links={choose(propsOverrideRemoteData, links, dashboardMetadata.tabs)}
        menuIcon={menuIcon}
        menuOpenIcon={menuOpenIcon}
        menuButtonAsLink={menuButtonAsLink}
        menuShowButton={menuShowButton}
        navbar_items={choose(
          propsOverrideRemoteData,
          navbar_items,
          dashboardMetadata.navbar_items
        )}
        navbarItemsToDisplay={navbarItemsToDisplay}
        status={choose(
          propsOverrideRemoteData,
          status,
          dashboardMetadata.navbar_status
        )}
        theme={theme}
      />
      <ResponsiveAppContainer>
        {loadingSpinner && loading && <Spinner />}
        <TabLoaderComponent tabs={dashboardMetadata.tabs} />
        {children}
      </ResponsiveAppContainer>
    </>
  )
}
