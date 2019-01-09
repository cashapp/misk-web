#!/bin/sh

for dir in "$(pwd)/"examples/*/*/src/
do
    dir=${dir%*/src/}
    slug=$(basename $dir)
    echo "[CI-EXAMPLES] ${dir} - ${slug}"
    docker run  --rm --name "$(date '+%Y-%m-%d%H-%M-%S')-$slug" -v "$dir:/web/tabs/$slug"  squareup/misk-web:latest /bin/misk-web -g
done
