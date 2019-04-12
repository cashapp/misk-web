<img src="https://raw.githubusercontent.com/square/misk/master/misk.png" width="300">

[![CircleCI](https://circleci.com/gh/square/misk-web.svg?style=svg)](https://circleci.com/gh/square/misk-web)

[Misk](https://github.com/square/misk) is a new open source application container from Square.

**Misk-Web** is a new micro-frontends Typescript + React web framework from Square. It happens to work seamlessly with [Misk](https://github.com/square/misk) but is also a robust stand alone web framework.

Misk-Web is still bleeding edge and may have breaking changes up until version `1.0.0`.

## NPM @misk Libraries

- [![npm](https://img.shields.io/npm/v/@misk/core.svg?label=@misk/core)](https://www.npmjs.com/package/@misk/core) &ndash; React + Typescript components and utilities
- [![npm](https://img.shields.io/npm/v/@misk/simpleredux.svg?label=@misk/simpleredux)](https://www.npmjs.com/package/@misk/simpleredux) &ndash; A simpler way to wire up interactive form, network, and other components with Redux
- [![npm](https://img.shields.io/npm/v/@misk/common.svg?label=@misk/common)](https://www.npmjs.com/package/@misk/common) &ndash; Common interfaces, colors, constants
- [![npm](https://img.shields.io/npm/v/@misk/dev.svg?label=@misk/dev)](https://www.npmjs.com/package/@misk/dev) &ndash; Shared developer build tools
- [![npm](https://img.shields.io/npm/v/@misk/test.svg?label=@misk/test)](https://www.npmjs.com/package/@misk/test) &ndash; Test libraries (Jest) and configuration
- [![npm](https://img.shields.io/npm/v/@misk/tslint.svg?label=@misk/tslint)](https://www.npmjs.com/package/@misk/tslint) &ndash; Standard TSLint configuration and rules
- [![npm](https://img.shields.io/npm/v/@misk/components.svg?label=@misk/components)](https://www.npmjs.com/package/@misk/components) &ndash; Deprecated, migrated to `@misk/core`

## Misk-Web-Plugin

Gradle plugin to build Misk-Web tabs included inside Kotlin / Java projects.

Get usage instructions at [Gradle M2 Repository](https://plugins.gradle.org/plugin/com.squareup.misk-web-plugin).

## [Getting Started](HOWTO.md): Build a new Tab

Install the Misk-Web CLI. You may need to edit your `~/.npmrc` and comment out any custom `registry` configurations.

```Bash
$ npm install -g @misk/cli
$ miskweb -h
```

Use the Misk-Web CLI to create a new tab. If it's in a Misk service, that should be in `{service name}/web/tabs/{new tab}` where `web` is at the same level as your Kotlin `src` directory.

```Bash
$ miskweb new
```

or

```Bash
$ curl -s https://raw.githubusercontent.com/square/misk-web/master/new-tab/get-new-tab.sh | bash -s && ./new-tab.sh
```

Read more instructions in [HOWTO](HOWTO.md)

## More

- [Examples](examples/): Data sets, Gradle examples for `misk-web-plugin`, Services, and Tabs

- [Recommended Workflow](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)

  1. Fork into your personal Github account
  1. Clone repo from your fork
  1. Add square as a remote with `git remote add square git@github.com:square/misk-web.git`
  1. Pull any new changes with `git pull square master`
  1. Push any new changes to a new branch in your personal fork
  1. Open PR from personal fork -> square/master
