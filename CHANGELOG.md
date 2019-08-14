## Changelog

## 0.1.17-2
Wed, 14 Aug 2019 16:15:27 GMT

### @misk/cli

* Use ShellJS instead of process.exit to pass through exit code

## 0.1.17-1
Wed, 14 Aug 2019 16:05:27 GMT

### @misk/cli

* Exit with failure codes from executed scripts so that CLI fails if downstream tasks fail

## 0.1.17-0
Wed, 14 Aug 2019 14:16:27 GMT

* Bump `react` and `react-dom` from `16.8.6` to `16.9.0`

### @misk/test

* Migrate from `react-testing-library` to `@testing-library/react` (package was renamed)
* Bump `@testing-library/react` from `6.1.2` to `9.1.1`
* All test files with imports from `react-testing-library` will need to be changed to import from `@testing-library/react`

## 0.1.16
Wed, 14 Aug 2019 13:39:27 GMT

### @misk/dev
* Two new keys added to `miskTab.json` for expanded configuration of the Webpack build provided by `@misk/dev`
  * `rawIndex` option stops injecting unused Script tags in Misk Loader tab, instead copies the index.html from src as is without any processing
  * `useWebpackBundleAnalyzer` allows turning off or on in non-production environments Webpack Bundler Analyzer reports

### @misk/simpleredux
* New `IRouterProvidedProps` interface to be uesd to access the optionally injected React-Router props of history, location, and match. Useful for handling path parameters, [see the docs for more](https://cashapp.github.io/misk-web/docs/guides/building-a-tab/5-path-parameters).

## 0.1.13
Wed, 15 Jul 2019 12:29:37 GMT

### @misk/simpleredux
* New `SimpleReduxSaga` type to alias the type of a `rootSaga` in a tab's `src/ducks/index.ts` to support bumping `redux-sagas` library. It looks as follows.
  ```Typescript
  export function* rootSaga(): SimpleReduxSaga {
    yield all([
      fork(watchPaletteSagas),
      ...
  ```


## Old Changelog
- 2019-02-21: First stable release of `@misk/simpleredux` at `0.1.4`.
- 2019-02-20: Move `ducks` out of `@misk/common` and `@misk/core` into `@misk/simpleredux` for better centralized, isolated functionality. Effective as of `@misk/*@0.1.4-4^`.
- 2019-02-20: All interfaces, functions, colors, and code in `@misk/common` has been moved to `@misk/core`. `@misk/common` now only has styles and vendors library creation. Update any broken references to point to `@misk/core`. Effective as of `@misk/*@0.1.4-3^`.
- 2019-02-14: `simpleNetworkResponse` renamed to `getSimpleNetwork`. Many other potential breaking changes in refactor and release of `SimpleNetworkDucks` and `SimpleFormDucks`. API not stable and may be changed in upcoming releases for simplicity. Effective as of `@misk/core@0.1.4-2^`.
- 2019-02-07: `response` in `simpleNetwork` library renamed to `simpleNetworkResponse` for less ambiguity when devs call it and to match prefixed function idiom established in `0.1.3-15`. Effective as of `@misk/core@0.1.3-18^`.
- 2019-02-07: `simpleNetwork` library functions in props are now all prefixed such that `this.props.get` is now `this.props.simpleNetworkGet` to prevent collisions with other dispatcher objects. Effective as of `@misk/core@0.1.3-15^`.
- 2018-11-30: `@misk/components` renamed to `@misk/core`. All versions and Docker at `0.1.0`.
- 2018-11-08: `@misk/common@0.0.61`, `@misk/core@0.0.77`, `@misk/dev@0.0.64`. Import styles as a css file instead of JS. New version required parameter in package.json:miskTab.

  Update `src/index.html` to include the following

  ```HTML
    <!-- Misk Libraries -->
    <link rel="stylesheet" type="text/css" href="/@misk/common/styles.css" />
    <script type="text/javascript" src="/@misk/common/vendors.js" preload></script>
    <script type="text/javascript" src="/@misk/common/common.js" preload></script>
    <script type="text/javascript" src="/@misk/core/components.js" preload></script>
  ```

- 2018-11-05: `@misk/common@^0.0.59`, `@misk/core@^0.0.76`, `@misk/dev@^0.0.60`, `@misk/tslint^@0.0.10`. Revert back to StyledComponents because of difficulties in downstream migrations. Upgrade to `connected-react-router@^5.0.0`.

  Replace all imports of `react-emotion` with `styled-components`.

  In `src/ducks/index.ts` update `rootReducer` and `IState` to the following

  ```Typescript
  import {
    connectRouter,
    LocationChangeAction,
    RouterState
  } from "connected-react-router"
  import { History } from "history"
  import { combineReducers, Reducer } from "redux"

  ...

  export interface IState {
    loader: ILoaderState
    router: Reducer<RouterState, LocationChangeAction>
  }

  ...

  export const rootReducer = (history: History) =>
    combineReducers({
        loader: LoaderReducer,
        router: connectRouter(history)
    })
  ```

- 2018-11-01: `@misk/dev@^0.0.47` and `@misk/common@^0.0.52`. Prettier integration, Slug now injected into `index.html`.

  Replace `src/index.html` with the following:

  ```HTML
  <!DOCTYPE html>
  <html>

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
  </head>

  <body>
      <div id="<%= htmlWebpackPlugin.options.slug %>"></div>

      <!-- Misk Libraries -->
      <script type="text/javascript" src="/@misk/common/styles.js" async></script>
      <script type="text/javascript" src="/@misk/common/vendors.js" preload></script>
      <script type="text/javascript" src="/@misk/common/common.js" preload></script>
      <script type="text/javascript" src="/@misk/core/components.js" preload></script>
  </body>

  </html>
  ```

  Create a file `prettier.config.js` with the following:

  ```Javascript
  const { createPrettierConfig } = require("@misk/dev")
  module.exports = createPrettierConfig()
  ```

  **This was reverted on 2018-11-05**: Replace all imports of `styled-components` with `react-emotion`.

  Add the following to `package.json` and add it as a prerequisite to `build` and `start` steps.

  ```JSON
  "lint": "prettier --write --config prettier.config.js \"./src/**/*.{md,css,sass,less,json,js,jsx,ts,tsx}\"",
  ```

  Change `miskTabBuilder` to `createTabWebpack` in `webpack.config.js`.

  Change `makeExternals` to `createExternals` in `webpack.config.js`.

- 2018-10-28: `@misk/common@^0.0.52`. `createApp()` and `createIndex()`

  Replace `src/index.tsx` with the following:

  ```Typescript
  import { createApp, createIndex } from "@misk/core"
  import * as Ducks from "./ducks"
  import routes from "./routes"
  export * from "./components"
  export * from "./containers"

  createIndex("config", createApp(routes), Ducks)
  ```

  Delete `src/App.tsx`.
