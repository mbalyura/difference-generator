#!/usr/bin/env node
import program from 'commander';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(firstConfig, secondConfig))
  .parse(process.argv);

console.log('app is running');

console.log(program.format);

console.log(program.opts());
