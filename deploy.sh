#!/usr/bin/env sh
set -e

yarn install
yarn run build

cd dist

echo 'tools.less.run' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:hitian/dev-tools.git master:gh-pages

cd -