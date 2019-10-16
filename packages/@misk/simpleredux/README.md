## Misk Simple Redux

![](https://raw.githubusercontent.com/cashapp/misk/master/misk.png)
Using Redux can be simple.

`@misk/SimpleRedux` includes all the Redux parts necessary for forms, network requests, and other interactive components. Don't write Redux boilerplate for basic interactivity again.

## Getting Started

```bash
$ npm install @misk/simpleredux
```

## SimpleSelector

### simpleSelectorGet

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

- `simpleSelectorGet`
  - `subState`: same as parameter 1 for `simpleSelect`. Example: `props.simpleForm`, `props.simpleNetwork`
  - `path`: allows any length path to an object key you'd like to access. This combines parameter 2 and 3 of `simpleSelect`.
    - Examples: `"Dino::Name.data", ["Dino::Price", "data"]`
    - Same as parameter in [Lodash/Get](https://lodash.com/docs#get)
  - `defaultValue?` is optional and allows setting of a default value if the requested path is not found.
    - Examples: `false, [], {}`
    - This is useful for cases like storing a list of tags where the UI expects an empty array `[]` in the case of no elements, not `undefined`.
    - Same as parameter in [Lodash/Get](https://lodash.com/docs#get)

### simpleSelectorPick

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

- `simpleSelectorPick`
  - `subState`: same as parameter 1 for `simpleSelect`.
    - Example: `props.simpleForm`, `props.simpleNetwork`
  - `paths`: array of paths of keys to return from object.
    - Example: `["Dino::Name.data", "Dino::Price.data"]`
    - Same as parameter in [Lodash/Pick](https://lodash.com/docs#pick)

## Merge and Failure Sagas

Dispatched actions can include an options object that has two very powerful keys:

- `mergeSaga`
- `failureSaga`

These are Redux sagas that are run on merge (success) or failure and allow for an additional async block of computation that include other network calls, seeding to many fields parts of the network response data, and anything else.

Both `mergeSaga` and `failureSaga` follow the same generic Redux Saga API. Consider looking at the [`src/saga.ts`](https://github.com/cashapp/misk-web/blob/master/packages/%40misk/simpleredux/src/saga.ts) or [`src/utilities/mergeSaga.ts`](https://github.com/cashapp/misk-web/blob/master/packages/%40misk/simpleredux/src/utilities/mergeSaga.ts) code to find examples of sagas already part of `@misk/simpleredux`.

## Resources

- [Example Form Code](https://github.com/cashapp/misk-web/blob/master/examples/tabs/palette-exemplar/src/containers/SampleFormContainer.tsx)
- [Example Network Code](https://github.com/cashapp/misk-web/blob/master/examples/tabs/palette-exemplar/src/containers/SampleNetworkContainer.tsx)
- [Understanding Redux](https://github.com/cashapp/misk-web/blob/master/packages/%40misk/simpleredux/REDUX.md)

## DEPRECATED: SimpleForm

A standardized set of form and input handler Redux-Sagas parts (actions, dispatcher, handlers, sagas, reducers, state interface)

## DEPRECATED: SimpleNetwork

A standardized set of Axios based request Redux-Sagas parts (actions, dispatcher, handlers, sagas, reducers, state interface)

## [Releasing](https://github.com/cashapp/misk-web/blob/master/RELEASING.md)

## [Changelog (and Breaking Changes)](https://github.com/cashapp/misk-web/blob/master/CHANGELOG.md)
