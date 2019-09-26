#!/bin/bash

OLD_TITLE_SPACE_CASE="Starter Basic"
OLD_SLUG_CASE="starter-basic"

NEW_TITLE_SPACE_CASE=$1
NEW_SLUG_CASE=$2

# 1. Make it work through `curl | bash -s` so a local shell file doesn't have to be updated

# 1. Download .zip of starter-basic src code from github
echo "Downloading fresh Starter Basic tab"
rm ./starter-basic.tgz
curl -sL0 https://github.com/cashapp/misk-web/raw/master/examples/tabs/starter-basic/starter-basic.tgz -o starter-basic.tgz

echo "Misk-Web: New Tab"
echo "A new tab will be created in $(pwd)/{new-tab}. If this is not right the directory, re-run this command in the correct directory."
if [ -z "$NEW_TITLE_SPACE_CASE" && -z "$NEW_SLUG_CASE" ]; then
  # 1. Prompt for new name in formats: `foo-bar`, `fooBar`, `FooBar`
  echo "You will now be guided through the steps to create a new tab based on the starter-basic tab"
  echo "Starter Basic Tab: https://github.com/cashapp/misk-web/tree/master/examples/tabs/starter-basic"
  echo ""
  echo "New Tab Name"
  echo "You'll now be asked how you want your tab name written in different formats (Title With Space Case, slug-case)."
  echo ""
  echo "Example for new dino-food tab"
  echo "Title Space Case: Dino Food"
  echo "slug-case: dino-food"
  echo ""
  read -p "Your new tab name in Title Space Case: " -r NEW_TITLE_SPACE_CASE
  read -p "Your new tab name in slug-case: " -r NEW_SLUG_CASE
  echo ""
fi
echo "Registered NEW_TITLE_SPACE_CASE ${NEW_TITLE_SPACE_CASE}"
echo "Registered NEW_SLUG_CASE        ${NEW_SLUG_CASE}"

# 1. Make new tab folder `starter-basic`

mkdir -p "./${NEW_SLUG_CASE}"
# 1. Unzips to pwd
echo "Unzip compressed Starter Basic tab to ./${NEW_SLUG_CASE}"
tar -xzvf ./starter-basic.tgz -C "./${NEW_SLUG_CASE}"

# 1. [Recursive find/replace](https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line) in directory of `starterBasic` -> `fooBar`, `StarterBasic` -> `FooBar`...

echo "Recursively updating code from ${OLD_TITLE_SPACE_CASE} => ${NEW_TITLE_SPACE_CASE}"
SED_TITLE_SPACE_CASE="'s/${OLD_TITLE_SPACE_CASE}/${NEW_TITLE_SPACE_CASE}/g'"
CMD_TITLE_CASE="find ./${NEW_SLUG_CASE} -type f -exec sed -i '' -e ${SED_TITLE_SPACE_CASE} {} \\;"
sh -c "$CMD_TITLE_CASE"

echo "Recursively updating code from ${OLD_SLUG_CASE} => ${NEW_SLUG_CASE}"
SED_SLUG_CASE="'s/${OLD_SLUG_CASE}/${NEW_SLUG_CASE}/g'"
CMD_SLUG_CASE="find ./${NEW_SLUG_CASE} -type f -exec sed -i '' -e ${SED_SLUG_CASE} {} \\;"
sh -c "$CMD_SLUG_CASE"

# echo "Recursively updating code from ${OLD_SLUG_CASE} => ${NEW_SLUG_CASE}"

echo "Set output_path to Jar compatible path in miskTab.json"
sed -i -e "s/\"output_path\": \"lib\",/\"output_path\": \"lib\/web\/_tab\/${NEW_SLUG_CASE}\",/g" ./${NEW_SLUG_CASE}/miskTab.json
# Remove sed generated original file
rm ./${NEW_SLUG_CASE}/miskTab.json-e

echo "Set zipOnBuild to false in miskTab.json"
sed -i -e 's/"zipOnBuild": true,/"zipOnBuild": false,/g' ./${NEW_SLUG_CASE}/miskTab.json
# Remove sed generated original file
rm ./${NEW_SLUG_CASE}/miskTab.json-e

echo "Remove open route in routes/index.ts"
sed -i -e 's/<Route component={TabContainer} \/>//g' ./${NEW_SLUG_CASE}/src/routes/index.tsx
# Remove sed generated original file
rm ./${NEW_SLUG_CASE}/src/routes/index.tsx-e

echo "Remove intermediate new-tab files"
rm starter-basic.tgz
rm new-tab-starter-basic.sh

echo ""
echo "Done!"
echo "Go check out your new tab ${NEW_SLUG_CASE} !"
echo "Use '$ miskweb ci-build' to install, build, and run tests."
echo "$ cd ${NEW_SLUG_CASE}"
echo "$ miskweb ci-build"

echo ""
echo "Running clean build in ./${NEW_SLUG_CASE}"
cd "$NEW_SLUG_CASE" || exit 1
miskweb ci-build
echo "${NEW_SLUG_CASE} has been installed, built, and tested!"
