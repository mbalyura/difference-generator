import fs from 'fs';
import genDiff from '../src';

const result = fs.readFileSync('__fixtures__/result.txt', 'utf-8');

test('two plain json', () => {
  const pathToBefore = '__fixtures__/before.json';
  const pathToAfter = '__fixtures__/after.json';
  expect(genDiff(pathToBefore, pathToAfter)).toEqual(result);
});

test('two plain yml', () => {
  const pathToBefore = '__fixtures__/before.yml';
  const pathToAfter = '__fixtures__/after.yml';
  expect(genDiff(pathToBefore, pathToAfter).includes('host: hexlet.io\n')).toBe(true);
  expect(genDiff(pathToBefore, pathToAfter).includes('+ timeout: 20\n')).toBe(true);
  expect(genDiff(pathToBefore, pathToAfter).includes('- follow: false\n')).toBe(true);
});

test('two plain ini', () => {
  const pathToBefore = '__fixtures__/before.ini';
  const pathToAfter = '__fixtures__/after.ini';
  expect(genDiff(pathToBefore, pathToAfter).includes('host: hexlet.io\n')).toBe(true);
  expect(genDiff(pathToBefore, pathToAfter).includes('- proxy: 123.234.53.22\n')).toBe(true);
  expect(genDiff(pathToBefore, pathToAfter).includes('+ verbose: true\n')).toBe(true);
});
