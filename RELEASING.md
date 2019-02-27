## Releasing a `@Misk/` Package on NPM

This outlines the steps necessary to release new `@misk` packages on NPM.

## NPM Setup

- Create an NPM user at [npmjs.com](http://npmjs.com/) and request membership in the [`@Misk` organization ](https://www.npmjs.com/org/misk). Membership will give you publish permissions for `@Misk` scoped packages.
- **Note:** member level may not actually be high enough to publish, needs further testing whether publish permissions are only available at Admin or Owner level.
- On your development machine, run `$ npm login` to authorize your local environment with publish permissions.

## Docker Setup

- Create a [Docker Hub](https://hub.docker.com/) user and request access to the [squareup](https://cloud.docker.com/u/squareup) organization. You will then have publish rights to the [squareup/misk-web](https://cloud.docker.com/u/squareup/repository/docker/squareup/misk-web) image used to build all Misk-Web tabs.
- On your development machine, run `$ docker login` to authorize your local environment with publish permissions.

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

- Update the changelog in `misk-web/packages/@misk/cli/src/utils/changelog.ts` with the new version. Consider the example where the new version to be published will be `0.1.3-4`. **The changelog is used in build file generation so this step is vitally important.**

  Currently

  ```Typescript
  export enum MiskVersion {
    "latest" = "0.1.2",
    "alpha" = "0.1.3-3",
    "v013_3" = "0.1.3-3",
    ...
  }

  ...

  export const MiskTabVersions: IMiskTabVersions = {
    [MiskVersion.v013_3]: {
      [MiskPkg.cli]: `${[MiskVersion.v013_3]}`,
      [MiskPkg.common]: `${[MiskVersion.v013_3]}`,
      [MiskPkg.core]: `${[MiskVersion.v013_3]}`,
      [MiskPkg.dev]: `${[MiskVersion.v013_3]}`,
      [MiskPkg.tslint]: `${[MiskVersion.v013_3]}`,
      date: "2019-01-08",
      notes: "Better error handling in CLI for miskTab.json:version"
    },
    ...
  }
  ```

  Update to the following. Bump alpha for prereleases and latest only for stable releases.

  ```Typescript
  export enum MiskVersion {
    "latest" = "0.1.2",
    "alpha" = "0.1.3-4",
    "v013_4" = "0.1.3-4",
    "v013_3" = "0.1.3-3",
    ...
  }

  ...

  export const MiskTabVersions: IMiskTabVersions = {
    [MiskVersion.v013_4]: {
      [MiskPkg.cli]: `${[MiskVersion.v013_4]}`,
      [MiskPkg.common]: `${[MiskVersion.v013_4]}`,
      [MiskPkg.core]: `${[MiskVersion.v013_4]}`,
      [MiskPkg.dev]: `${[MiskVersion.v013_4]}`,
      [MiskPkg.tslint]: `${[MiskVersion.v013_4]}`,
      date: "2019-01-08",
      notes: "Description of the changes in the release."
    },
    [MiskVersion.v013_3]: {
      [MiskPkg.cli]: `${[MiskVersion.v013_3]}`,
      [MiskPkg.common]: `${[MiskVersion.v013_3]}`,
      [MiskPkg.core]: `${[MiskVersion.v013_3]}`,
      [MiskPkg.dev]: `${[MiskVersion.v013_3]}`,
      [MiskPkg.tslint]: `${[MiskVersion.v013_3]}`,
      date: "2019-01-08",
      notes: "Better error handling in CLI for miskTab.json:version"
    },
    ...
  }
  ```

- Publish to NPM with the command below. You will need to enter TOTP 2 factor authentication codes to publish each package to NPM. **If you don't have 2 factor authentication for NPM enabled, enable it immedietely.**

  ```Bash
  $ rush publish --include-all -a -p
  ```

- 🎉 All packages will now be live on NPM!

- Now publish a matching Docker `misk-web` image version that will contain all the new packages. Use the command below in the `misk-web/docker` directory.

  ```Bash
  $ ./build-tag-push.sh misk-web 0.1.3-4
  ```

- After the Docker image is built you should see the following print out. Verify two things

  1. New image successfully pushed to the Docker Hub repository. Look for similar output as below:

  ```
  Successfully built be00d8904623
  Successfully tagged squareup/misk-web:0.1.3-4
  [TAG] squareup/misk-web:latest
  [PUSH] squareup/misk-web:0.1.3-4
  The push refers to repository [docker.io/squareup/misk-web]
  8a5278557aba: Pushed
  901f9a8915b1: Pushed
  18110f63496b: Pushed
  abbd24a8638d: Layer already exists
  945feb772e99: Layer already exists
  7bff100f35cb: Layer already exists
  0.1.3-4: digest: sha256:581f0d3872faad7dc6a7bd322a5da64629ecce2442b1a04ea3553ad11e7c6e96 size: 1578
  ```

  2. Confirm that the updated `@misk` NPM packages were included in the image build. Look for similar output as below:

  ```
  [INSPECT] squareup/misk-web:0.1.3-4 shipped with following @misk/ NPM packages
  /usr/local/lib
  +-- @misk/cli@0.1.3-4
  +-- @misk/components@0.1.0
  +-- @misk/core@0.1.3-4
  +-- @misk/dev@0.1.3-4
  +-- @misk/tslint@0.1.3-4
  `-- npm@6.4.1
  ```

- Commit all code changes with a commit message starting with `[RELEASE] 0.1.3-4.`

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
