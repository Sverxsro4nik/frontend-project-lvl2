#!/usr/bin/env node
// import process from 'process';
import { Command } from 'commander';
import diffFile from '../src/main.js';

const program = new Command();
program.version('0.0.1');
program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type] output format')
  .action((filepath1, filepath2, { format }) => {
    console.log(diffFile(filepath1, filepath2, format));
  })
  .parse();
