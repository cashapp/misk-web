#!/usr/bin/env node

import yargs from "yargs"

yargs
  .scriptName("miskweb")
  .commandDir("commands")
  .demandCommand()
  .option("e", {
    alias: "each",
    describe: "run command in all subdirectories that have miskTab.json",
    type: "boolean"
  })
  .help()
  .version()
  .usage(
    "Misk Web CLI Usage: $ $0 <command> <required arg> [optional arg] [options]"
  )
  .strict().argv
