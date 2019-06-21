## Misk CLI

![](https://raw.githubusercontent.com/cashapp/misk/master/misk.png)
This package provides the Misk CLI tool that generates build files for Misk Tabs.

## Getting Started

```bash
$ npm install -g @misk/cli
```

## Commands

```Bash
Misk Web CLI Usage: $ miskweb <command> <required arg> [optional arg] [options]

Commands:
  miskweb auto-pin [filename]  auto-pin searches upstream for a [filename]
                               (default: master-dependencies.json) and uses the
                               pinned version in key `miskWebNPM` for all tab
                               Misk Web dependencies

  miskweb build                run a fast Webpack development build

  miskweb ci-build             npm install, then Webpack production build, tests

  miskweb clean                remove lib directory and other temporary files

  miskweb install              install node_modules dependencies

  miskweb lint                 use prettier to lint all files

  miskweb misk                 generate multibindings to configure tab with a
                               Misk service

  miskweb new                  create a new tab in the current directory

  miskweb path <URLpath>       set relative URL path where tab will be served in
                               browser. Provides support for a non-Misk Admin
                               Dashboard tab that is a dedicated Misk Web front
                               end

  miskweb pin <pinnedVersion>  pin version for all tab Misk Web dependencies

  miskweb prebuild             use miskTab.json to generate build files

  miskweb start                start Webpack Dev Server for live editing

  miskweb test-coverage        generate test coverage report with `jest --
                               --coverage`

  miskweb test-update          update test snapshots with `jest -- -u`

  miskweb test                 run tests

  miskweb update               update Misk Web CLI

  miskweb zip                  zip source code for tab


Options:
  -e, --each  run command in all subdirectories that have miskTab.json [boolean]
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
```

## [Releasing](https://github.com/cashapp/misk-web/blob/master/RELEASING.md)

## [Changelog (and Breaking Changes)](https://github.com/cashapp/misk-web/blob/master/CHANGELOG.md)
