import { fromJS, List } from "immutable"
export * from "./simpleDucksUtilities"
export * from "./routerDucks"
export * from "./simpleFormDucks"
export * from "./simpleNetworkDucks"

/**
 * Default State with Redux flow metadata wrapped in an Immutable JS object for more efficient use in Reducers
 */
export interface IDefaultState {
  data: any
  error: any
  loading: boolean
  simpleTag: string
  success: boolean
}

/**
 * RootState has added simpleTag for easier use in selectors
 */
export interface IDefaultRootState extends IDefaultState {
  simpleTag: string
}

export interface IDefaultImmutableState {
  toJS: () => IDefaultState | IDefaultRootState
}

/**
 * Initializes new default state with initial Redux metadata state
 */
export const defaultState: IDefaultImmutableState = fromJS({
  data: List([]),
  error: null,
  loading: false,
  success: false
})

/**
 *
 * @param simpleTag string identifier for the state domain
 * Used to initialize a top level domain of Redux state
 *
 * Example
 * Domain: simpleForm
 * Access: this.state.simpleForm
 * simpleTag: "simpleForm"
 * Initialize: defaultRootState("simpleForm")
 */
export const defaultRootState = (simpleTag: string): IDefaultImmutableState =>
  fromJS({
    simpleTag,
    ...defaultState.toJS()
  })

/**
 * Create type safe Redux Actions
 */
export interface IAction<T, P> {
  readonly type: T
  readonly payload?: P
}

export function createAction<T extends string, P>(
  type: T,
  payload: P
): IAction<T, P> {
  return { type, payload }
}

/**
 *
 * @param error Generates message given a potentially null error object
 */
export const errorMessage = (error: any) => {
  if (!error) {
    return ""
  }

  let code = error.errorCode
  if (!code) {
    code =
      error.response && error.response.status === 401
        ? "Unauthorized"
        : "InternalServerError"
  }

  return code
}
