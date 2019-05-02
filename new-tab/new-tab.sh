#!/bin/bash

OLD_ALL_CAP_CASE="PALETTEEXEMPLAR"
OLD_TITLE_CASE="PaletteExemplar"
OLD_TITLE_SPACE_CASE="Palette Exemplar"
OLD_CAMEL_CASE="paletteExemplar"
OLD_SLUG_CASE="palette-exemplar"

# 1. Make it work through `curl | bash -s` so a local shell file doesn't have to be updated

# 1. Download .zip of palette src code from github
echo "Downloading fresh Palette Exemplar tab"
rm ./palette-exemplar.tgz
curl -sL0 https://github.com/square/misk-web/raw/master/examples/tabs/palette-exemplar/palette-exemplar.tgz -o palette-exemplar.tgz

# 1. Prompt for new name in formats: `foo-bar`, `fooBar`, `FooBar`
echo "Misk-Web: New Tab"
echo "A new tab will be created in $(pwd)/{new-tab}. If this is not right the directory, re-run this command in the correct directory."
echo "You will now be guided through the steps to create a new tab based on the exemplar Palette tab"
echo "Palette Exemplar Tab: https://github.com/square/misk-web/tree/master/examples/tabs/palette-exemplar"
echo ""
echo "New Tab Name"
echo "You'll now be asked how you want your tab name written in different formats (ALLCAPCASE, TitleCase, Title With Space Case, camelCase, slug-case)."
echo "This is necessary to build your new tab off of palette-exemplar."
echo ""
echo "Example for new dino-food tab"
echo "ALLCAPCASE: DINOFOOD"
echo "TitleCase: DinoFood"
echo "Title Space Case: Dino Food"
echo "camelCase: dinoFood"
echo "slug-case: dino-food"
echo ""
read -p "Your new tab name in ALLCAPCASE: " -r NEW_ALL_CAP_CASE
read -p "Your new tab name in TitleCase: " -r NEW_TITLE_CASE
read -p "Your new tab name in Title Space Case: " -r NEW_TITLE_SPACE_CASE
read -p "Your new tab name in camelCase: " -r NEW_CAMEL_CASE
read -p "Your new tab name in slug-case: " -r NEW_SLUG_CASE
echo ""
echo "Registered NEW_ALL_CAP_CASE     ${NEW_ALL_CAP_CASE}"
echo "Registered NEW_TITLE_CASE       ${NEW_TITLE_CASE}"
echo "Registered NEW_TITLE_SPACE_CASE ${NEW_TITLE_SPACE_CASE}"
echo "Registered NEW_CAMEL_CASE       ${NEW_CAMEL_CASE}"
echo "Registered NEW_SLUG_CASE        ${NEW_SLUG_CASE}"

# 1. Make new tab folder `palette-exemplar`

mkdir -p "./${NEW_SLUG_CASE}"
# 1. Unzips to pwd
echo "Unzip compressed Palette Tab to ./${NEW_SLUG_CASE}"
tar -xzvf ./palette-exemplar.tgz -C "./${NEW_SLUG_CASE}"

# 1. [Recursive find/replace](https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line) in directory of `paletteExemplar` -> `fooBar`, `PaletteExemplar` -> `FooBar`...

echo "Recursively updating code from ${OLD_ALL_CAP_CASE} => ${NEW_ALL_CAP_CASE}"
SED_ALL_CAP_CASE="'s/${OLD_ALL_CAP_CASE}/${NEW_ALL_CAP_CASE}/g'"
CMD_ALL_CAP_CASE="find ./${NEW_SLUG_CASE} -type f -exec sed -i '' -e ${SED_ALL_CAP_CASE} {} \\;"
sh -c "$CMD_ALL_CAP_CASE"

echo "Recursively updating code from ${OLD_TITLE_CASE} => ${NEW_TITLE_CASE}"
SED_TITLE_CASE="'s/${OLD_TITLE_CASE}/${NEW_TITLE_CASE}/g'"
CMD_TITLE_CASE="find ./${NEW_SLUG_CASE} -type f -exec sed -i '' -e ${SED_TITLE_CASE} {} \\;"
sh -c "$CMD_TITLE_CASE"

echo "Recursively updating code from ${OLD_TITLE_SPACE_CASE} => ${NEW_TITLE_SPACE_CASE}"
SED_TITLE_SPACE_CASE="'s/${OLD_TITLE_SPACE_CASE}/${NEW_TITLE_SPACE_CASE}/g'"
CMD_TITLE_CASE="find ./${NEW_SLUG_CASE} -type f -exec sed -i '' -e ${SED_TITLE_SPACE_CASE} {} \\;"
sh -c "$CMD_TITLE_CASE"

echo "Recursively updating code from ${OLD_CAMEL_CASE} => ${NEW_CAMEL_CASE}"
SED_CAMEL_CASE="'s/${OLD_CAMEL_CASE}/${NEW_CAMEL_CASE}/g'"
CMD_CAMEL_CASE="find ./${NEW_SLUG_CASE} -type f -exec sed -i '' -e ${SED_CAMEL_CASE} {} \\;"
sh -c "$CMD_CAMEL_CASE"

echo "Recursively updating code from ${OLD_SLUG_CASE} => ${NEW_SLUG_CASE}"
SED_SLUG_CASE="'s/${OLD_SLUG_CASE}/${NEW_SLUG_CASE}/g'"
CMD_SLUG_CASE="find ./${NEW_SLUG_CASE} -type f -exec sed -i '' -e ${SED_SLUG_CASE} {} \\;"
sh -c "$CMD_SLUG_CASE"

# echo "Recursively updating code from ${OLD_SLUG_CASE} => ${NEW_SLUG_CASE}"

echo "Rename files with Palette in name"
mv ./${NEW_SLUG_CASE}/src/ducks/${OLD_CAMEL_CASE}.ts ./${NEW_SLUG_CASE}/src/ducks/${NEW_CAMEL_CASE}.ts

# Set zipOnBuild to false in miskTab.json
echo "Set zipOnBuild to false in miskTab.json"
sed -i -e 's/"zipOnBuild": true,/"zipOnBuild": false,/g' ./${NEW_SLUG_CASE}/miskTab.json
rm ./${NEW_SLUG_CASE}/miskTab.json-e

echo "Remove intermediate new-tab files"
rm palette-exemplar.tgz
rm new-tab.sh

echo ""
echo "Done!"
echo "Go check out your new tab ${NEW_SLUG_CASE} !"
echo "Use '$ miskweb ci-build' to install, build, and run tests."
echo "$ cd ${NEW_SLUG_CASE}"
echo "$ miskweb ci-build"
