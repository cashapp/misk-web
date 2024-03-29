import React from "react"
import { Provider } from "react-redux"
import { render } from "@testing-library/react"
import { createStore } from "redux"
import { rootReducer } from "src/ducks"
import { MemoryRouter } from "react-router-dom"

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
export const renderWithRedux: (
  ui: React.ReactElement<
    any,
    | string
    | ((
        props: any
      ) => React.ReactElement<
        any,
        string | (new (props: any) => React.Component<any, any, any>)
      >)
    | (new (props: any) => React.Component<any, any, any>)
  >,
  { initialState, store }?: any
) => any = (
  ui,
  { initialState, store = createStore(rootReducer(), initialState) }: any = {}
) => {
  return {
    ...render(
      <MemoryRouter>
        <Provider store={store}>{ui}</Provider>
      </MemoryRouter>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  }
}
