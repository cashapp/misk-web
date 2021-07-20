import { Intent } from "@blueprintjs/core"
import { HTTPMethod } from "http-method-enum"

export const HTTPMethodIntent: { [method in HTTPMethod]: Intent } = {
  [HTTPMethod.CONNECT]: Intent.DANGER,
  [HTTPMethod.DELETE]: Intent.DANGER,
  [HTTPMethod.GET]: Intent.PRIMARY,
  [HTTPMethod.HEAD]: Intent.WARNING,
  [HTTPMethod.OPTIONS]: Intent.NONE,
  [HTTPMethod.PATCH]: Intent.SUCCESS,
  [HTTPMethod.POST]: Intent.SUCCESS,
  [HTTPMethod.PUT]: Intent.SUCCESS,
  [HTTPMethod.TRACE]: Intent.NONE
}

export const HTTPStatusCodeIntent = (code: number) => {
  if (200 <= code && code < 300) {
    return Intent.SUCCESS
  } else if (300 <= code && code < 400) {
    return Intent.PRIMARY
  } else if (400 <= code && code < 500) {
    return Intent.WARNING
  } else if (500 <= code && code < 600) {
    return Intent.DANGER
  } else {
    return Intent.NONE
  }
}
