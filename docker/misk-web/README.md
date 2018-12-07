# squareup/misk-web

Base Alpine NodeJS package for Misk Web builds.

Includes `misk-web` script and `@misk/` packages. `misk-web` handles running various commands over all @misk/ packages and tabs

# Example Usage

- Build on all tabs:

  ```bash
  $ docker run -d --rm --name container-name -v /absolute/local/path/to/web:/web squareup/misk-web:0.0.1 misk-web -b
  ```

- Build on single tab:

  ```bash
  $ docker run -d --rm --name container-name -v /absolute/local/path/to/web/tabs/tabname:/web/tabs/tabname squareup/misk-web:0.0.1 misk-web -b
  ```

- Dev Server on a single tab:

  ```bash
  $ docker run -d --rm --name container-name -v /absolute/local/path/to/web/tabs/tabname:/web/tabs/tabname squareup/misk-web:0.0.1 misk-web -d
  ```

- Any command over all tabs:

  ```bash
  $ docker run -d --rm --name container-name -v /absolute/local/path/to/web:/web squareup/misk-web:0.0.1 misk-web -z "your command here"
  ```

- See `misk-web -h` for more usage options

# [Changelog](https://square.github.io/misk-web/misk-web/web/@misk/cli/src/index.ts)
