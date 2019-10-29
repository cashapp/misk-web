## Changelog

## 0.1.23-3

29 Oct 2019 19:58:00 GMT

### @misk/test

- Add max workers to Jest configuration to prevent CircleCI out of memory errors

## 0.1.23-2

16 Oct 2019 14:40:00 GMT

### @misk/simpleredux

- Plumb out `failureSaga` option for similar purpose to `mergeSaga` except for in failure cases
- For example, a `failureSaga` could be added to a `simpleHttpPost` call that on call failure, issues a network request retry or other action

## 0.1.23-1

15 Oct 2019 17:24:00 GMT

### @misk/core

- Update `DashboardMetadataAction` path to `/api/dashboard/{dashboardId}/metadata`

## 0.1.23-0

15 Oct 2019 17:24:00 GMT

### @misk/core

- Update `MiskContainer` to support Misk API changes to `DashboardMetadataAction` and `ServiceMetadataAction`

## 0.1.22

1 Oct 2019 15:24:00 GMT

### @misk/simpleredux

Fix bug in `handler` parsing of `options.overrideArgs`.

## 0.1.21

1 Oct 2019 15:24:00 GMT

### @misk/simpleredux

Update `handler` functions to accept `overrideArgs` in the options object, instead of as a seperate function parameter. This specifically improves the usage for onClick functions as outlined below where empty options object no longer need to be used to reach the `overrideArgs` parameter.

```jsx
// Old
<Button onClick={handler.simpleMergeData(props, "my-tag", {}, data)}/>

// New
<Button onClick={handler.simpleMergeData(props, "my-tag", { overrideArgs: data })}/>
```

## 0.1.20

25 Sept 2019 16:24:00 GMT

Stable release including all the changes of `0.1.20-*` al
pha releases.

## 0.1.20-4

25 Sept 2019 15:24:00 GMT

### @misk/simpleredux

- Fix more bugs found using `mergeSagaMapKeysToTags` in different use cases.

## 0.1.20-3

25 Sept 2019 14:24:00 GMT

### @misk/simpleredux

- New dedicated `mergeSaga` file for all library provided generic `mergeSaga` that can optionally be used in `dispatchSimpleRedux` calls to add post call asynchronous functionality
- Rename `mapMergeSaga` to `mergeSagaMapKeysToTags` and move to separate `mergeSaga` file
- Add documentation and stub out test for `mergeSagaMapKeysToTags`

## 0.1.20-2

27 Sept 2019 11:24:00 GMT

### @misk/core

- `Table` component now takes a range `[start: number, end: number]` to signify the rows to display. This replaces the `maxRows` props.

### @misk/simpleredux

- `simpleSelectorPickTransform` extends existing `simpleSelectorPick` (which matches [Lodash's Pick API](https://lodash.com/docs#pick)) to allow for reshaping the object with picked keys.
- `dispatchSimpleRedux` functions now take an options object that allows for named passing in of `requestConfig` and `mergeSaga`. `mergeSaga` accepts a generator function Saga that will run after the dispatch function's action is executed. This means that a `simpleHttpGet` will execute first and then the response will be included in the payload that the `mergeSaga` has access to. `mergeSaga` is then responsible to choose whether to emit any additional state update events or handle other asynchronous computation. Since it is a full saga and a generating function, the block of computation is asynchronous and follow up network requests or large computation can be done without risk of blocking render. See a full example of this in the new `ExampleMergeSagaContainer` in `palette-exemplar`.
- Universal `handler`. Many components allow for passing in an `onChange` handler that is a function accepting user event driven input and executing side effects. For example, an `<InputGroup/>` returns the latest text in the text box, and a simple `onChange` handler would persist the latest text in a tagged spot in Redux. Components though do not have a universal form of input they provide to their `onChange` handler. Instead of developers having to keep track of what function signature the component `onChange` props is expecting, `@misk/simpleredux` now has a universal `handler` that provides the same function names as `dispatchSimpleRedux` (ie. `handler.simpleMergeData`, `handler.simpleHttpGet`...) but can handle directly input from an component `onChange` or `onClick` props.
- The universal `handler` can handle input from any `onChange` or `onClick` props because of a new `parseOnChangeArgs` engine that identifies the format of input from `onChange` and returns it in a format that the `dispatchSimpleRedux` functions can use. See examples of `handler` in both `starter-basic` and `palette-exemplar` tabs.
- `onFn[Click,Change,Toggle,Tags]Call` functions are deprecated in favor of `handler`.

## 0.1.20-1

25 Sept 2019 20:40:00 GMT

### @misk/cli

- `new` command now accepts two positional arguments for `titleCase` and `slugCase` names for the new tab to be generated. The Misk-Web CLI no longer requires manual invocation of `./new-tab.sh`!

### Example Tabs

- Add support to `./new-tab-starter-basic.sh` that allow `starter-basic` to be used in docs site demo and as template for new tabs
- Add `Palette-Exemplar` and `Palette-LTS` tabs to docs site example demos

## 0.1.20-0

25 Sept 2019 20:40:00 GMT

### @misk/core

- Upstream new `<Table data={data} maxRows={5} />` component from palette-exemplar tab for tables that autogenerate from a list of objects.

### Example Tabs

- New `starter-basic` tab for use in `miskweb new` creation of new tabs. Much simpler bare bones structure making for a less overwhelming start for new tab developers.
- `palette-exemplar` will remain to showcase more advanced features and use cases

## 0.1.19

17 Sept 2019 19:19:00 GMT

Stable release including all the changes of `0.1.19-*` alpha releases.

- Bug fixes for `0.1.18` release of `@misk/simpleredux`
- New `MiskNavbarContainer` in `@misk/core`

## 0.1.19-3

17 Sept 2019 18:25:00 GMT

### @misk/core

- Upstream from Misk, the `MiskNavbarContainer` that can be extended to support front end dashboards for any Misk service

## 0.1.19-2

16 Sept 2019 18:34:00 GMT

### @misk/simpleredux

- Reverse changes from `0.1.19-1`
- Add new dispatch function `simpleMergeData` that does the similar encapsulation instead to provide that functionality to call sites that aren't using `on*FnCall` utilities
- Deprecated `simpleFormInput` now resolves to `simpleMergeData` instead of `simpleMerge`

## 0.1.19-1

16 Sept 2019 15:55:00 GMT

### @misk/simpleredux

- Update `onChangeFnCall`, `onChangeToggleFnCall` and `onChangeTagFnCall` to call functions with data enclosed in an object with a `data` key. This will fix outstanding bugs from the new simpleMerge` functionality. No migration should be required.
  - Old
  ```ts
  export const onChangeFnCall = (callFn: any, ...args: any) => (event: any) => {
    callFn(...args, event.target.value);
  };
  ```
  - New
  ```ts
  export const onChangeFnCall = (callFn: any, ...args: any) => (event: any) => {
    callFn(...args, { data: event.target.value });
  };
  ```

## 0.1.19-0

13 Sept 2019 20:16:00 GMT

### @misk/simpleredux

- Move `HTTPMethodDispatch` from `@misk/core` to `@misk/simpleredux` to fix and prevent future API drift

## 0.1.18

13 Sept 2019 17:52:00 GMT

Stable release including all the changes of `0.1.18-*` alpha releases.

## 0.1.18-7

13 Sept 2019 15:18:00 GMT

### @misk/cli

- Update Yargs library usage. There should no longer be deprecation warnings!

## 0.1.18-6

12 Sept 2019 15:18:00 GMT

### @misk/simpleredux

- Unified SimpleRedux flow merging together SimpleForm and SimpleNetwork
- Extensive test coverage across new flow
- Usage of old SimpleForm and SimpleNetwork Redux elements now call out to the new SimpleRedux flow and log deprecation warnings encouraging upgrading to the unified flow.

## 0.1.18-5

12 Sept 2019 14:57:00 GMT

### @misk/core

- Add `ResponsiveAppContainer` that extends `ResponsiveContainer` with styling to keep it below the Navbar
- Make `environmentToColor` theme configuration easier with lookup table now as a parameter to create the function
- See examples in the [Custom Styling docs](https://cashapp.github.io/misk-web/docs/guides/building-a-tab/09-custom-styling)

## 0.1.18-3

11 Sept 2019 20:17:00 GMT

### @misk/core

- Navbar is now themable!
- Override the default theme by providing a new theme through props
- Take advantage of the `defaultTheme` if you only want to change one of the theme values
- See examples in the [Custom Styling docs](https://cashapp.github.io/misk-web/docs/guides/building-a-tab/09-custom-styling)

## 0.1.18-2

10 Sept 2019 20:59:00 GMT

### @misk/core

- Added new props to Navbar to allow customization of MenuButton. All are optional and have sane defaults for the default interaction of showing the menu with respective icons.
  - `menuIcon?: IconName | JSX.Element | string`: Set the icon that shows when the menu is closed. It can be a BlueprintJS IconName, a React JSX.Element, or a string URL to an image.
  - `menuOpenIcon?: IconName | JSX.Element | string`: Set the icon that shows when the menu is open. It can be a BlueprintJS IconName, a React JSX.Element, or a string URL to an image.
  - `menuButtonAsLink?: boolean`: Show the menuIcon and onClick go to the `homeUrl` instead of opening the menu.
  - `menuShowButton?: boolean`: Hide the MenuButton entirely.

### @misk/test

- Add `@testing-library/dom` library for easier tests that check for certain rendered elements or text

## 0.1.18-1

22 Aug 2019 22:18:00 GMT

### @misk/simpleredux

- Move around files in library
- There should be no change in functionality

## 0.1.18-0

22 Aug 2019 19:54:00 GMT

### @misk/simpleredux

- Deprecate `simpleSelect` in favor of two new functions: `simpleSelectorGet` and `simpleSelectorPick`
- Both new functions have the same API and under the hood use Lodash corresponding functions [`get`](https://lodash.com/docs#get) and [`pick`](https://lodash.com/docs#pick)
- Update `simpleSelect` calls to either of the two new functions soon as `simpleSelect` will be removed in a future release
- See more in [`@misk/simpleredux` documentation](https://cashapp.github.io/misk-web/docs/packages/simpleredux/README)

#### simpleSelectorGet

- Allows for single-key cached selection from Redux state
- Most directly equivalent to deprecated `simpleSelect`

  ```Typescript
  // OLD
  const field1 = simpleSelect(props.simpleForm, "Dino::Field1", "data")
  const tagsField = simpleSelect(props.simpleForm, "Dino::Tags", "data", simpleType.array)

  // NEW
  const field1 = simpleSelectorGet(props.simpleForm, ["Dino::Field1", "data"])
  const tagsField = simpleSelectorGet(props.simpleForm, ["Dino::Tags", "data"], [])
  ```

#### simpleSelectorPick

- Allows for multi-key cached selection from Redux state

  ```Typescript
  // OLD
  const fields = [
    "Name",
    "Price",
    "Itemized Receipt",
    "CheckAlice",
    "CheckBob",
    "CheckEve",
    "CheckMallory",
    "CheckTrent",
    "Meal",
    "Tags"
  ].map((f: string) => `Dino::${f}`)
  const fieldsData = fields
    .map((key: string) => {
      const value = simpleSelect(props.simpleForm, key, "data")
      return { [key]: value }
    })
    .reduce((prev, current) => ({...prev, ...current}), {})

  // New
  const fields = [
    "Name",
    "Price",
    "Itemized Receipt",
    "CheckAlice",
    "CheckBob",
    "CheckEve",
    "CheckMallory",
    "CheckTrent",
    "Meal",
    "Tags"
  ].map((f: string) => `Dino::${f}.data`)
  const fieldsData = simpleSelectorPick(props.simpleForm, fields)
  ```

## 0.1.17

20 Aug 2019 14:00:00 GMT

- Stable release

## 0.1.17-4

15 Aug 2019 14:00:00 GMT

### @misk/dev

- Use webpack `alias` for `src/` and `tests/` imports

### @misk/test

- Use `moduleNameMapper` in `jest` for `src/` and `tests/` imports

## 0.1.17-2

14 Aug 2019 16:15:27 GMT

### @misk/cli

- Use ShellJS instead of process.exit to pass through exit code

## 0.1.17-1

14 Aug 2019 16:05:27 GMT

### @misk/cli

- Exit with failure codes from executed scripts so that CLI fails if downstream tasks fail

## 0.1.17-0

14 Aug 2019 14:16:27 GMT

- Bump `react` and `react-dom` from `16.8.6` to `16.9.0`

### @misk/test

- Migrate from `react-testing-library` to `@testing-library/react` (package was renamed)
- Bump `@testing-library/react` from `6.1.2` to `9.1.1`
- All test files with imports from `react-testing-library` will need to be changed to import from `@testing-library/react`

## 0.1.16

14 Aug 2019 13:39:27 GMT

### @misk/dev

- Two new keys added to `miskTab.json` for expanded configuration of the Webpack build provided by `@misk/dev`
  - `rawIndex` option stops injecting unused Script tags in Misk Loader tab, instead copies the index.html from src as is without any processing
  - `useWebpackBundleAnalyzer` allows turning off or on in non-production environments Webpack Bundler Analyzer reports

### @misk/simpleredux

- New `IRouterProvidedProps` interface to be uesd to access the optionally injected React-Router props of history, location, and match. Useful for handling path parameters, [see the docs for more](https://cashapp.github.io/misk-web/docs/guides/building-a-tab/5-path-parameters).

## 0.1.13

15 Jul 2019 12:29:37 GMT

### @misk/simpleredux

- New `SimpleReduxSaga` type to alias the type of a `rootSaga` in a tab's `src/ducks/index.ts` to support bumping `redux-sagas` library. It looks as follows.
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
