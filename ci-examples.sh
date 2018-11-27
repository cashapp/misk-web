#!/bin/sh

for dir in "$(pwd)/"/examples/services/*/src/
do
    dir=${dir%*/src/}
    slug=$(basename $dir)
    docker run  --rm --name "$(date '+%Y-%m-%d%H-%M-%S')-$slug" -v "$dir:/web/tabs/$slug"  squareup/misk-web:latest /bin/misk-web -g
done

for dir in "$(pwd)/"/examples/tabs/*/src/
do
    dir=${dir%*/src/}
    slug=$(basename $dir)
    docker run  --rm --name "$(date '+%Y-%m-%d%H-%M-%S')-$slug" -v "$dir:/web/tabs/$slug"  squareup/misk-web:latest /bin/misk-web -g
done
