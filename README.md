<img src="https://raw.githubusercontent.com/square/misk/master/misk.png" width="300">

[![Build Status](https://travis-ci.com/square/misk-web.svg?branch=master)](https://travis-ci.org/square/misk-web)

[Misk](https://github.com/square/misk) is a new open source application container from Square.

**Misk-Web** is a new micro-frontends Typescript + React web framework from Square. It happens to work seamlessly with [Misk](https://github.com/square/misk) but is also a robust stand alone web framework.

Misk-Web is not ready for use. The API is not stable.

## NPM Libraries

- [![npm](https://img.shields.io/npm/v/@misk/common.svg?label=@misk/common)](https://www.npmjs.com/package/@misk/common) &ndash; Common interfaces, colors
- [![npm](https://img.shields.io/npm/v/@misk/components.svg?label=@misk/components)](https://www.npmjs.com/package/@misk/components) &ndash; React + Typescript components and utilities
- [![npm](https://img.shields.io/npm/v/@misk/dev.svg?label=@misk/dev)](https://www.npmjs.com/package/@misk/dev) &ndash; Webpack config builder, Typescript compiler config, Prettier linting, and other shared developer build tools
- [![npm](https://img.shields.io/npm/v/@misk/tslint.svg?label=@misk/tslint)](https://www.npmjs.com/package/@misk/tslint) &ndash; Standard TSLint configuration and rules

## Migrating from Misk

1. Add `"miskWeb": "com.squareup.misk-web:misk-web:2018.11.23-00fdf9e",` to your `dependencies.gradle`
1. Add `compile dep.miskWeb` to your `service/build.gradle`

```Groovy

dependencies {
  ...
  compile dep.miskWeb
  ...
}

```

## [Recommended Workflow](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)

1. Fork into your personal Github account
1. Clone repo from your fork
1. Add square as a remote with `git remote add square git@github.com:square/misk-web.git`
1. Pull any new changes with `git pull square master`
1. Push any new changes to a new branch in your personal fork
1. Open PR from personal fork -> square/master

## [Example Projects](examples/)
