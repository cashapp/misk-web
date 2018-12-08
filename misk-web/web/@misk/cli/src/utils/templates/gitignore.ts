import { generatedByCLI } from "../templates"

export const gitignore = `.git
.DS_Store
**/@misk/web
cachedUrls
logs
*.log
npm-debug.log*
coverage
node_modules
.npm
package-lock.json
yarn.lock
build
dist
lib
.hash
.old_build_files

${generatedByCLI}
`
