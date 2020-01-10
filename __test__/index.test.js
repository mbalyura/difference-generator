import fs from 'fs';
import genDiff from '../src';

test('two plain json', () => {
  const pathToBefore = '__fixtures__/before.json';
  const pathToAfter = '__fixtures__/after.json';
  const result = fs.readFileSync('__fixtures__/result.txt', 'utf-8');
  expect(genDiff(pathToBefore, pathToAfter)).toEqual(result);
  expect(genDiff(pathToBefore, pathToAfter).includes('host: hexlet.io\n')).toBe(true);
  expect(genDiff(pathToBefore, pathToAfter).includes('+ timeout: 20\n')).toBe(true);
  expect(genDiff(pathToBefore, pathToAfter).includes('- follow: false\n')).toBe(true);
});

test('two plain yml', () => {
  const pathToBefore = '__fixtures__/before.yml';
  const pathToAfter = '__fixtures__/after.yml';
  const result = fs.readFileSync('__fixtures__/result.txt', 'utf-8');
  expect(genDiff(pathToBefore, pathToAfter)).toEqual(result);
  expect(genDiff(pathToBefore, pathToAfter).includes('host: hexlet.io\n')).toBe(true);
  expect(genDiff(pathToBefore, pathToAfter).includes('+ timeout: 20\n')).toBe(true);
  expect(genDiff(pathToBefore, pathToAfter).includes('- follow: false\n')).toBe(true);
});
