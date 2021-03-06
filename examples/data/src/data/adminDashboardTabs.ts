import { IDashboardTab } from "@misk/core"

export const adminDashboardTabs: { adminDashboardTabs: IDashboardTab[] } = {
  adminDashboardTabs: [
    {
      name: "First Tab",
      slug: "first-tab",
      url_path_prefix: "/first-tab/"
    },
    {
      name: "Second Tab",
      slug: "second-tab",
      url_path_prefix: "/second-tab/"
    },
    {
      name: "Palette",
      slug: "palette",
      url_path_prefix: "/palette/"
    },
    {
      name: "Misk Web Repo",
      slug: "misk-web-repo",
      url_path_prefix: "https://github.com/cashapp/misk-web"
    }
  ]
}
