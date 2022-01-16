#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();
program.version('0.0.1');
program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type] output format')
  .parse(process.argv);