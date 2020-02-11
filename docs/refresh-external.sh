#!/bin/bash

echo "[WARN] This deploys the current local state of docs, consider a Rush rebuild!"

MW=$(cd .. && pwd)
EXTERNAL=$MW/docs/static/external
EXAMPLES=$MW/docs/static/examples
rm -rf $EXTERNAL

# Copy README over
cat $MW/README.md | grep -v 'project website' > $MW/docs/pages/index.md
cat $MW/RELEASING.md > $MW/docs/docs/guides/releasing.md
cat $MW/CHANGELOG.md > $MW/docs/docs/guides/changelog.md
cat $MW/CONTRIBUTING.md > $MW/docs/docs/guides/contributing.md
cat $MW/docs/README.md > $MW/docs/docs/guides/contributing-to-the-docs.md

# Copy over tab demos
declare -a tabs=("palette-exemplar" "palette-lts" "starter-basic")
for tab in "${tabs[@]}"; do
    DIR=$EXAMPLES/tabs/$tab/demo
    mkdir -p $DIR
    cp -r $MW/examples/tabs/$tab/lib/* $DIR
done

# Copy over example data demo
DIR=$EXAMPLES/data/demo
mkdir -p $DIR
cp -r $MW/examples/data/demo/* $DIR

# Copy over documentation from @misk/* packages
for dir in $MW/packages/@misk/*/; do
    dir=${dir%*/}      # remove the trailing "/"
    PKG=${dir##*/}    # print everything after the final "/"
    cp $dir/*.md $MW/docs/docs/packages/$PKG/
done
