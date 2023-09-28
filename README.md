<img src="https://raw.githubusercontent.com/cashapp/misk/master/misk.png" width="300"/>

# Deprecation Warning

Misk-Web is deprecated, please do not create new tabs and plan to migrate off long term.

The Misk dashboard is migrating away from a React Typescript stack to using server-side-rendered kotlinx.html using Hotwire and Tailwind CSS.

# Existing Readme Below

See the [project website][docs] for documentation and APIs.

[Misk-Web][repo] is a micro-frontends Typescript + React web framework from Cash App.

It also happens to work seamlessly with [Misk](https://github.com/cashapp/misk)!

## Quick Links

- [Building a Tab Guide](https://cashapp.github.io/misk-web/docs/guides/building-a-tab)
- [Integrating with Misk Guide](https://cashapp.github.io/misk-web/docs/guides/integrating-with-misk)
- [Examples](https://cashapp.github.io/misk-web/examples/)
- [Changelog](https://cashapp.github.io/misk-web/docs/guides/changelog)
- [Other Repo Information](https://cashapp.github.io/misk-web/docs/guides)

## NPM Packages

| NPM Package                                                                                                                           | Docs                    | Description                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| [![npm](https://img.shields.io/npm/v/@misk/core.svg?label=@misk/core)](https://www.npmjs.com/package/@misk/core)                      | [Docs][coredocs]        | React + Typescript components and utilities                                         |
| [![npm](https://img.shields.io/npm/v/@misk/simpleredux.svg?label=@misk/simpleredux)](https://www.npmjs.com/package/@misk/simpleredux) | [Docs][simplereduxdocs] | A simpler way to wire up interactive form, network, and other components with Redux |
| [![npm](https://img.shields.io/npm/v/@misk/common.svg?label=@misk/common)](https://www.npmjs.com/package/@misk/common)                | [Docs][commondocs]      | Common interfaces, colors, constants                                                |
| [![npm](https://img.shields.io/npm/v/@misk/dev.svg?label=@misk/dev)](https://www.npmjs.com/package/@misk/dev)                         | [Docs][devdocs]         | Shared developer build tools                                                        |
| [![npm](https://img.shields.io/npm/v/@misk/prettier.svg?label=@misk/prettier)](https://www.npmjs.com/package/@misk/prettier)          | [Docs][prettierdocs]    | Shared [Prettier config](https://prettier.io/docs/en/configuration.html)            |
| [![npm](https://img.shields.io/npm/v/@misk/test.svg?label=@misk/test)](https://www.npmjs.com/package/@misk/test)                      | [Docs][testdocs]        | Test libraries (Jest) and configuration                                             |
| [![npm](https://img.shields.io/npm/v/@misk/tslint.svg?label=@misk/tslint)](https://www.npmjs.com/package/@misk/tslint)                | [Docs][tslintdocs]      | Standard TSLint configuration and rules                                             |
| [![npm](https://img.shields.io/npm/v/@misk/components.svg?label=@misk/components)](https://www.npmjs.com/package/@misk/components)    | [Deprecated]            | Migrated to `@misk/core`                                                            |

[repo]: https://github.com/cashapp/misk-web/
[docs]: https://cashapp.github.io/misk-web/
[coredocs]: https://cashapp.github.io/misk-web/docs/packages/core/
[simplereduxdocs]: https://cashapp.github.io/misk-web/docs/packages/simpleredux/
[commondocs]: https://cashapp.github.io/misk-web/docs/packages/common/
[devdocs]: https://cashapp.github.io/misk-web/docs/packages/dev/
[prettierdocs]: https://cashapp.github.io/misk-web/docs/packages/prettier/
[testdocs]: https://cashapp.github.io/misk-web/docs/packages/test/
[tslintdocs]: https://cashapp.github.io/misk-web/docs/packages/tslint/
[componentsdocs]: https://cashapp.github.io/misk-web/docs/packages/components/

## How to work with this repo

misk-web manages its Node installation via [Hermit](https://cashapp.github.io/hermit/). Follow the
Quickstart guide, then activate the hermit environment:

```bash
cd path/to/misk-web
source bin/activate-hermit
```

Also consider enabling [Hermit shell hooks](https://cashapp.github.io/hermit/usage/shell/).

This repo is a monorepo managed by [Rush](https://rushjs.io/). Using Rush allows coordinated version
releases and iterative builds, among other headache-saving features. Please take time to read their
documentation for other commands not described below.

Set up rush:

```bash
npm i -g @microsoft/rush
```

Then build everything:

```bash
# Like `npm install`, but for all packages in the repo.
rush update
# Like `npm run build`, but for all of them.
rush build
```
