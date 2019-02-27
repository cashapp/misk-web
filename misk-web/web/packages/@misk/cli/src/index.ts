#!/usr/bin/env node

import * as yargs from "yargs"

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
  .usage("$0 <command> [opts]")
  .strict().argv
