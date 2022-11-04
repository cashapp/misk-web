///<reference types="webpack-env" />
import { CombinatorEffect } from "@misk/simpleredux"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { Provider } from "react-redux"
import { applyMiddleware, compose, createStore, Reducer } from "redux"
import createSagaMiddleware from "redux-saga"
import { IWindow } from "../utilities"

export const createIndex = (
  tabSlug: string,
  App: () => JSX.Element,
  Ducks: {
    rootReducer: () => Reducer
    rootSaga: () => IterableIterator<CombinatorEffect<"ALL", any>>
  }
) => {
  const Window = window as unknown as IWindow

  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancer: typeof compose =
    Window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    Ducks.rootReducer(),
    {},
    composeEnhancer(applyMiddleware(sagaMiddleware))
  )

  /**
   * Starts the rootSaga which forks off instances of all sagas used to receive and process actions as they are dispatched (./sagas/index.ts)
   */
  sagaMiddleware.run(Ducks.rootSaga)

  const render = () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>,
      document.getElementById(tabSlug)
    )
  }

  render()

  // Hot reloading
  if (module.hot) {
    // Reload components
    module.hot.accept(App as any, () => {
      render()
    })

    // Reload reducers
    module.hot.accept(Ducks as any, () => {
      store.replaceReducer(Ducks.rootReducer())
    })
  }
}
