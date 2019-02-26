## Misk CLI

![](https://raw.githubusercontent.com/square/misk/master/misk.png)
This package provides the Misk CLI tool that generates build files for Misk Tabs.

## Getting Started

```bash
$ npm install -g @misk/cli
```

## Commands

```Bash
miskweb <command> [opts]

Commands:
  miskweb build     run webpack production build
  miskweb ci-build  run a fast, clean, webpack production build
  miskweb clean     remove build directory and other temporary files
  miskweb lint      lint all files
  miskweb new       create a new tab in the current directory
  miskweb prebuild  consume miskTab.json and write necessary build files
  miskweb start     start webpack development server
  miskweb zip       zip source code for tab

Options:
  -e, --each  run command in all subdirectories that have miskTab.json [boolean]
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
```

## [Releasing](https://github.com/square/misk-web/blob/master/RELEASING.md)

## [Changelog (and Breaking Changes)](https://github.com/square/misk-web/blob/master/CHANGELOG.md)
