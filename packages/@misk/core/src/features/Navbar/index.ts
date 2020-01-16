export * from "./Banner"
export * from "./MiskContainer"
export * from "./Common"
export * from "./Component"
export * from "./DimensionAwareNavbar"
export * from "./HomeLink"
export * from "./Menu"
export * from "./processNavbarItems"
export * from "./MiskNavbarGroup"

// Choose between remote data and props provided based on override configuration
export const choose = <T>(
  propsOverrideRemote: boolean,
  prop: T,
  remote: T
): T => (propsOverrideRemote && prop) || remote || prop
