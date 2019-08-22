## Misk Simple Redux

![](https://raw.githubusercontent.com/cashapp/misk/master/misk.png)
Using Redux can be simple.

`@misk/SimpleRedux` includes all the Redux parts necessary for forms, network requests, and other interactive components. Don't write Redux boilerplate for basic interactivity again.

## Getting Started

```bash
$ npm install @misk/simpleredux
```

## SimpleForm

A standardized set of form and input handler Redux-Sagas parts (actions, dispatcher, handlers, sagas, reducers, state interface)

[Example Code](https://github.com/cashapp/misk-web/blob/master/examples/tabs/palette-exemplar/src/containers/SampleFormContainer.tsx)

## SimpleNetwork

A standardized set of Axios based request Redux-Sagas parts (actions, dispatcher, handlers, sagas, reducers, state interface)

[Example Code](https://github.com/cashapp/misk-web/blob/master/examples/tabs/palette-exemplar/src/containers/SampleNetworkContainer.tsx)

[Understanding Redux](https://github.com/cashapp/misk-web/blob/master/packages/%40misk/simpleredux/REDUX.md)

## SimpleSelector

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

- `simpleSelectorGet`
  - `subState`: same as parameter 1 for `simpleSelect`. Example: `props.simpleForm`, `props.simpleNetwork`
  - `path`: allows any length path to an object key you'd like to access. This combines parameter 2 and 3 of `simpleSelect`.
    - Examples: `"Dino::Name.data", ["Dino::Price", "data"]`
    - Same as parameter in [Lodash/Get](https://lodash.com/docs#get)
  - `defaultValue?` is optional and allows setting of a default value if the requested path is not found.
    - Examples: `false, [], {}`
    - This is useful for cases like storing a list of tags where the UI expects an empty array `[]` in the case of no elements, not `undefined`.
    - Same as parameter in [Lodash/Get](https://lodash.com/docs#get)

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

- `simpleSelectorPick`
  - `subState`: same as parameter 1 for `simpleSelect`.
    - Example: `props.simpleForm`, `props.simpleNetwork`
  - `paths`: array of paths of keys to return from object.
    - Example: `["Dino::Name.data", "Dino::Price.data"]`
    - Same as parameter in [Lodash/Pick](https://lodash.com/docs#pick)

## [Releasing](https://github.com/cashapp/misk-web/blob/master/RELEASING.md)

## [Changelog (and Breaking Changes)](https://github.com/cashapp/misk-web/blob/master/CHANGELOG.md)
