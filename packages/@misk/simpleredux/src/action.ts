/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export enum SIMPLEREDUX {
  // Lifecycle
  SUCCESS = "SIMPLEREDUX_SUCCESS",
  FAILURE = "SIMPLEREDUX_FAILURE",
  MERGE = "SIMPLEREDUX_MERGE",
  // Async HTTP Network Calls
  HTTP_DELETE = "SIMPLEREDUX_HTTP_DELETE",
  HTTP_GET = "SIMPLEREDUX_HTTP_GET",
  HTTP_HEAD = "SIMPLEREDUX_HTTP_HEAD",
  HTTP_PATCH = "SIMPLEREDUX_HTTP_PATCH",
  HTTP_POST = "SIMPLEREDUX_HTTP_POST",
  HTTP_PUT = "SIMPLEREDUX_HTTP_PUT",
  // Redux as UI / Field Input Cache
  CACHE = "SIMPLEREDUX_CACHE", // Merge any value into the state
  CACHE_NUMBER = "SIMPLEREDUX_NUMBER", // Merge a number into the state
  CACHE_TOGGLE = "SIMPLEREDUX_TOGGLE" // Toggle a boolean stored in the state
}
