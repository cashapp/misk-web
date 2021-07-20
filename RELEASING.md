# Releasing `@Misk` Packages on NPM

Alpha releases happen automatically after each merge to `master` branch. Check the commit history for commits by `Misk-Web Alpha Release Bot` for examples.

Alphas releases are denoted by the trailing additional version added to the regular SemVar version of format `major.minor.patch-alpha`. For example, `0.1.25-5` is the `-5` alpha build of upcoming `0.1.25` stable release.

As a result of Alpha releases happening automatically, any merged changes or bumped dependencies end up in usable, published NPM packages shortly after the PR being merged. To update tabs to latest alpha release, follow the linked steps to use [\$ miskweb pin](https://cashapp.github.io/misk-web/docs/guides/building-a-tab/08-upgrading-misk-web-version).

## Manual Releasing `@Misk` Packages on NPM

This outlines the steps necessary to manually release new `@misk` packages on NPM.

## NPM Setup

- Create an NPM user at [npmjs.com](http://npmjs.com/) and request membership in the [`@Misk` organization ](https://www.npmjs.com/org/misk). Membership will give you publish permissions for `@Misk` scoped packages.
- **Note:** member level may not actually be high enough to publish, needs further testing whether publish permissions are only available at Admin or Owner level.
- On your development machine, run `$ npm login` to authorize your local environment with publish permissions.

## Rush: Setup

- `@misk` packages are in a directory managed by [Rush](https://rushjs.io/). This allows coordinated version releases and iterative builds among other headache saving features.
- Developing `@misk` packages is different than regular Misk tabs in that all builds are not done in Docker, but locally with Rush. This is much faster and highly recommended.
- Using Rush requires a working local Node `10.5+` Long Term Support (LTS) environment. Consider using [nvm](https://github.com/creationix/nvm) to ensure the latest `10.5+` LTS version is present.
- Take the time to familiarize yourself with [Rush](https://rushjs.io/). They have [good documentation](https://rushjs.io/pages/intro/welcome/) and a quick start guide is below.

## Rush: Quick Start Guide

```Bash
$ npm install -g @microsoft/rush
$ cd </your/code/directory>/misk-web
$ rush update
$ rush build
```

## Releasing

- `@misk` packages in this repo are managed by [Rush](https://rushjs.io/), which allows easy coordinated releases of all packages (ie. release all with a common version number). [Read their docs](https://rushjs.io/pages/intro/welcome/) to understand how to develop using Rush and how to setup your environment.
- All commands below must be run from the `misk-web` root directory.
- Use the command below to bump the version across all packages.

  ```Bash
  $ rush version --bump
  ```

- Publish to NPM with the command below. You will need to enter TOTP 2 factor authentication codes to publish each package to NPM. **If you don't have 2 factor authentication for NPM enabled, enable it immedietely.**

  ```Bash
  $ rush publish --include-all -a -p
  ```

- 🎉 All packages will now be live on NPM!

- Update `CHANGELOG.md` with the changes included in this published version.

- Now update the example tabs `miskTab.json`, update Rush's NPM version lockfile, and confirm that everything still builds.

  ```Bash
  $ miskweb pin 0.1.3-4 -e
  $ miskweb prebuild -e
  $ rush update --full
  $ rush build
  ```

- Deploy fresh version of docs site that includes the latest `CHANGELOG.md`.

  ```Bash
  $ cd docs
  $ yarn deploy
  ```

- Commit all code changes with a commit message starting with `[RELEASE] 0.1.3-4.`

### Optional use of Rush Change for formatted changelog

- Use `rush change` to update the Changelog. Commit and squash these changes into the `[RELEASE] X.Y.Z-Q` commit.

- 🎉 Congratulations! You've released a new set of `@misk` packages! Downstream `misk-web` tabs can now simply update the `version` in their `miskTab.json` and on their next build, they will start using the latest packages.

## Deprecating

If a package is no longer required, you must mark it as deprecated on NPM. Use the command below with an informative message and your One Time Password for NPM 2FA.

```Bash
npm deprecate @misk/tabs@0.0.1 "Deprecation Message" --otp=
```

## Publishing `misk-web-plugin`

- `misk-web-plugin` is a Gradle plugin written in Kotlin DSL that builds Misk-Web tabs within a Java/Kotlin project.

- Builds of tabs are done within a Docker container that contains the latest version of `@misk/*` NPM packages on a Node Alpine base image.

- Publish the plugin to [Gradle M2](https://plugins.gradle.org/plugin/com.squareup.misk-web-plugin) locally by using `./gradlew pluginPublic` with `Gradle M2` credentials stored in a local `~/.gradle/gradle.properties` file.
