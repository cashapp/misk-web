import { generatedByCLI } from "../templates"
import { IMiskTabJSON } from ".."

export const gitignore = (miskTab: IMiskTabJSON) => `.git
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
prettier.config.js
tsconfig.json
tslint.json
webpack.config.js
*.js.map
${miskTab.rawGitginore}
${generatedByCLI}
`
