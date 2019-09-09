/**
 * Actions
 * string enum of the defined actions that is used as type enforcement for Reducer and Sagas arguments
 */
export enum SIMPLEREDUX {
  // Lifecycle
  MERGE = "SIMPLEREDUX_MERGE",
  FAILURE = "SIMPLEREDUX_FAILURE",
  // Async HTTP Network Calls
  HTTP_DELETE = "SIMPLEREDUX_HTTP_DELETE",
  HTTP_GET = "SIMPLEREDUX_HTTP_GET",
  HTTP_HEAD = "SIMPLEREDUX_HTTP_HEAD",
  HTTP_PATCH = "SIMPLEREDUX_HTTP_PATCH",
  HTTP_POST = "SIMPLEREDUX_HTTP_POST",
  HTTP_PUT = "SIMPLEREDUX_HTTP_PUT"
}
