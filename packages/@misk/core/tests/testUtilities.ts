import { IDashboardTab } from "../src"

export const testTabs = [
  {
    name: "Tab Alpha",
    category: "Admin",
    slug: "tab-alpha",
    url_path_prefix: "/tab/alpha/",
  },
  {
    name: "Tab Bravo",
    category: "Extra",
    slug: "tab-bravo",
    url_path_prefix: "/tab/bravo/",
  },
]

export const axiosError = {
  response: { status: 401, statusText: "Not authorized", data: "" },
}

export const adminDashboardTabs: IDashboardTab[] = [
  {
    name: "First Tab",
    slug: "first-tab",
    url_path_prefix: "/first-tab/",
  },
  {
    name: "Second Tab",
    slug: "second-tab",
    url_path_prefix: "/second-tab/",
  },
  {
    name: "Palette",
    slug: "palette",
    url_path_prefix: "/palette/",
  },
  {
    name: "Misk Web Repo",
    slug: "misk-web-repo",
    url_path_prefix: "https://github.com/cashapp/misk-web",
  },
]
