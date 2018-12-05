#!/bin/sh


# 1. Make it work through `curl | bash -s` so shell file doesn't have to be updated


# 1. Prompt for new name in formats: `foo-bar`, `fooBar`, `FooBar`


# 1. Download .zip of palette src code from github
curl -s0 https://github.com/square/misk-web/raw/master/examples/tabs/palette/src.tgz -o ./src.tgz


# 1. Unzips to pwd


# 1. Renames folder to `foo-bar


# 1. [Recursive find/replace](https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line) in directory of `palette` -> `fooBar`, `Palette` -> `FooBar`

