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

const getFixturePath = (filename, extension) => `${__dirname}/../__fixtures__/${filename}.${extension}`;

test.each(table)(
  'compare 2 files(%s, %s)', (extension, format) => {
    const beforePath = getFixturePath('before', extension);
    const afterPath = getFixturePath('after', extension);
    const result = fs.readFileSync(getFixturePath(format, 'txt'), 'utf-8');
    expect(genDiff(beforePath, afterPath, format)).toEqual(result);
  },
);
