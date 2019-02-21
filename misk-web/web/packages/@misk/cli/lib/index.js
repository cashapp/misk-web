#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yargs = tslib_1.__importStar(require("yargs"));
yargs
    .commandDir("commands")
    .demandCommand(1)
    .help()
    .version().argv;
//# sourceMappingURL=index.js.map