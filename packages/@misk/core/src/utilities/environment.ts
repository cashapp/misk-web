import { color, Environment } from "../utilities"

export const defaultEnvironment = Environment.PRODUCTION
export const defaultEnvironmentIndicatorsVisible = [
  Environment.DEVELOPMENT,
  Environment.STAGING,
  Environment.TESTING
]

export interface EnvironmentToColorLookup {
  default: color | string
  DEVELOPMENT: color | string
  TESTING: color | string
  STAGING: color | string
  PRODUCTION: color | string
}

export const defaultEnvironmentToColorLookup: EnvironmentToColorLookup = {
  default: color.cadet,
  DEVELOPMENT: color.blue,
  TESTING: color.indigo,
  STAGING: color.green,
  PRODUCTION: color.red
}

export const environmentToColor = (colorLookup: EnvironmentToColorLookup) => (
  environment: Environment
) => {
  try {
    return colorLookup[environment]
  } catch (e) {
    return colorLookup.default
  }
}
