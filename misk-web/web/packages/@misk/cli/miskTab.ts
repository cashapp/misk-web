enum MiskVersion {
  "v0_1_1_alpha_0_5" = "0.1.1-alpha-0.5"
}

interface IMiskTab {
  name: string
  port: number
  relative_path_prefix: string
  slug: string
  version: MiskVersion
}

const miskTab: IMiskTab = {
  name: "test",
  port: 2424,
  relative_path_prefix: "/_admin",
  slug: "test",
  version: MiskVersion.v0_1_1_alpha_0_5
}
