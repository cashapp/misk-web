import { Environment, IDashboardTab, IServiceMetadata } from "@misk/common"

export const mockServiceMetadata: IServiceMetadata = {
  admin_dashboard_url: "/_admin/",
  app_name: "Dashboard",
  environment: Environment.DEVELOPMENT
}

export const mockAdminDashboardTabs: IDashboardTab[] = [
  {
    name: "First Tab",
    slug: "first-tab",
    url_path_prefix: "/_admin/first-tab/"
  },
  {
    name: "Second Tab",
    slug: "second-tab",
    url_path_prefix: "/_admin/second-tab/"
  }
]
