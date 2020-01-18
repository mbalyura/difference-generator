import fs from 'fs';
import genDiff from '../src';

const table = [
  ['json', 'tree'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yml', 'tree'],
  ['yml', 'plain'],
  ['yml', 'json'],
  ['ini', 'tree'],
  ['ini', 'plain'],
  ['ini', 'json'],
];

test.each(table)(
  'compare 2 files(%s, %s)', (ext, format) => {
    const before = `${__dirname}/../__fixtures__/before.${ext}`;
    const after = `${__dirname}/../__fixtures__/after.${ext}`;
    const result = fs.readFileSync(`${__dirname}/../__fixtures__/results/${ext}_${format}.txt`, 'utf-8');
    expect(genDiff(before, after, format)).toEqual(result);
  },
);
