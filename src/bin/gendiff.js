#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.0.8')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format (default - "tree")')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
