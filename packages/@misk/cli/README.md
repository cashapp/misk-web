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
  miskweb build     run a fast webpack development build
  miskweb ci-build  npm install, then clean webpack production build
  miskweb clean     remove lib directory and other temporary files
  miskweb install   install node_modules dependencies
  miskweb lint      use prettier to lint all files
  miskweb new       create a new tab in the current directory
  miskweb prebuild  consume miskTab.json and write necessary build files
  miskweb start     start webpack development server for live editing
  miskweb update    update miskweb CLI
  miskweb zip       zip source code for tab

Options:
  -e, --each  run command in all subdirectories that have miskTab.json [boolean]
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
```

## [Releasing](https://github.com/square/misk-web/blob/master/RELEASING.md)

## [Changelog (and Breaking Changes)](https://github.com/square/misk-web/blob/master/CHANGELOG.md)
