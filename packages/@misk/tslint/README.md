## Misk TsLint

![](https://raw.githubusercontent.com/cashapp/misk/master/misk.png)
This package provides shared TsLint linting across Misk tab repos.

## Getting Started

```bash
$ yarn add @misk/tslint
```

## TsLint Template

Create a `tslint.json` file in the repo root directory with the following:

```JSON
  {
    "extends": "@misk/tslint"
  }
```

## Included TsLint Packages

From `package.json`:

```JSON
  tslint
  tslint-blueprint
  tslint-clean-code
  tslint-config-prettier
  tslint-consistent-codestyle
  tslint-eslint-rules
  tslint-immutable
  tslint-react
```

## [Releasing](https://github.com/cashapp/misk-web/blob/master/RELEASING.md)

## [Changelog (and Breaking Changes)](https://github.com/cashapp/misk-web/blob/master/CHANGELOG.md)
