![](https://raw.githubusercontent.com/square/misk/master/misk.png)

[Misk](https://github.com/square/misk) is a new open source application container from Square.

**Misk-Web** is a new micro-frontends Typescript + React web framework from Square. It happens to work seamlessly with [Misk](https://github.com/square/misk) but is also a robust stand alone web framework.

Misk-Web is not ready for use. The API is not stable.

## Migrating from Misk

1. Add `"miskWeb": "com.squareup.misk-web:misk-web:2018.11.20-06a2d00",` to your `dependencies.gradle`
1. Add `classpath dep.miskWeb` to your `build.gradle`

```Groovy

subprojects {
  buildscript {
    repositories {
      mavenCentral()
      jcenter()
    }

    dependencies {
      ...

      classpath dep.miskWeb
      ...

    }

    ...

```

## [Recommended Workflow](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)

1. Fork into your personal Github account
1. Clone repo from your fork
1. Add square as a remote with `git remote add square git@github.com:square/misk-web.git`
1. Pull any new changes with `git pull square master`
1. Push any new changes to a new branch in your personal fork
1. Open PR from personal fork -> square/master

## [Example Projects](/examples)
