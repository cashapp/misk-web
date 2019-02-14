/**
 * Common Utilities for use in simple*Ducks libraries
 */

/**
 *
 * @param json likely JSON input as a string
 * @returns JSON or string if JSON.parse fails
 */
export const jsonOrString = (json: string) => {
  try {
    return JSON.parse(json)
  } catch (e) {
    return json
  }
}

export const getPayloadTag = (payload: { [tag: string]: any }) => {
  return payload[Object.keys(payload)[0]]
}
