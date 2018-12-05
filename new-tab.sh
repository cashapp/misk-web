#!/bin/bash

OLD_ALL_CAP_CASE="PALETTE"
OLD_TITLE_CASE="Palette"
OLD_CAMEL_CASE="palette"
OLD_SLUG_CASE="palette"

# 1. Make it work through `curl | bash -s` so a local shell file doesn't have to be updated


# 1. Prompt for new name in formats: `foo-bar`, `fooBar`, `FooBar`
echo "Misk-Web: New Tab"
echo "A new tab will be created in $(pwd)/{new-tab}. If this is not right the directory, re-run this command in the correct directory."
echo "You will now be guided through the steps to create a new tab based on the exemplar Palette tab"
echo "Palette Tab: https://github.com/square/misk-web/tree/master/examples/tabs/palette"
echo "New Tab Name"
echo "You'll now be asked how you want your tab name written in different formats (ALLCAPCASE, TitleCase, camelCase, slug-case)."
read -p "Tab Name in ALLCAPCASE: " -r NEW_ALL_CAP_CASE
read -p "Tab Name in TitleCase: " -r NEW_TITLE_CASE
read -p "Tab Name in camelCase: " -r NEW_CAMEL_CASE
read -p "Tab Name in slug-case: " -r NEW_SLUG_CASE
echo ""
echo "Registered NEW_ALL_CAP_CASE   ${NEW_ALL_CAP_CASE}"
echo "Registered NEW_TITLE_CASE     ${NEW_TITLE_CASE}"
echo "Registered NEW_CAMEL_CASE     ${NEW_CAMEL_CASE}"
echo "Registered NEW_SLUG_CASE      ${NEW_SLUG_CASE}"

# 1. Download .zip of palette src code from github
echo "Downloading fresh Palette tab"
rm ./palette.tar
wget -O palette.tgz https://github.com/square/misk-web/raw/master/examples/tabs/palette/palette.tgz

# 1. Make new tab folder `foo-bar`

mkdir -p ./${NEW_SLUG_CASE}
# 1. Unzips to pwd
echo "Unzip compressed Palette Tab to ./${NEW_SLUG_CASE}"
tar -xzvf ./palette.tgz -C ./${NEW_SLUG_CASE}

# 1. [Recursive find/replace](https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line) in directory of `palette` -> `fooBar`, `Palette` -> `FooBar`

