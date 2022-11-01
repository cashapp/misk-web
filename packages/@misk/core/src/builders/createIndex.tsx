///<reference types="webpack-env" />
import { CombinatorEffect } from "@misk/simpleredux"
import { createBrowserHistory, History } from "history"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { Provider } from "react-redux"
import {
  AnyAction,
  applyMiddleware,
  compose,
  createStore,
  Reducer
} from "redux"
import { createReduxHistoryContext, RouterState } from "redux-first-history"
import createSagaMiddleware from "redux-saga"
import { IWindow } from "../utilities"

export const createIndex = (
  tabSlug: string,
  App: ({ history }: { history: History }) => JSX.Element,
  Ducks: {
    rootReducer: (
      routerReducer: Reducer<RouterState>
    ) => Reducer<{ router: Reducer<RouterState, AnyAction> } & any, AnyAction>
    rootSaga: () => IterableIterator<CombinatorEffect<"ALL", any>>
  }
) => {
  const Window = window as unknown as IWindow

  Window.Misk.History = Window.Misk.History || createBrowserHistory()
  const history: History = Window.Misk.History

  const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
      history
    })

  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancer: typeof compose =
    Window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    Ducks.rootReducer(routerReducer),
    composeEnhancer(applyMiddleware(sagaMiddleware, routerMiddleware))
  )

  /**
   * Starts the rootSaga which forks off instances of all sagas used to receive and process actions as they are dispatched (./sagas/index.ts)
   */
  sagaMiddleware.run(Ducks.rootSaga)

  const render = () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <App history={createReduxHistory(store)} />
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
      store.replaceReducer(Ducks.rootReducer(routerReducer))
    })
  }
}
