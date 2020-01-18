import fs from 'fs';
import path from 'path';
import parse from './parser';
import getAst from './astBuilder';
import render from './formatters';

const readFiles = (pathToBefore, pathToAfter) => {
  const absolutePathToBefore = path.resolve(process.cwd(), pathToBefore);
  const absolutePathToAfter = path.resolve(process.cwd(), pathToAfter);

  const typeBefore = path.extname(pathToBefore);
  const typeAfter = path.extname(pathToAfter);

  const contentBefore = fs.readFileSync(absolutePathToBefore, 'utf-8');
  const contentAfter = fs.readFileSync(absolutePathToAfter, 'utf-8');

  const objectBefore = parse(contentBefore, typeBefore);
  const objectAfter = parse(contentAfter, typeAfter);

  return [objectBefore, objectAfter];
};

const genDiff = (pathToBefore, pathToAfter, format) => {
  const [objectBefore, objectAfter] = readFiles(pathToBefore, pathToAfter);
  const ast = getAst(objectBefore, objectAfter);

  return render(ast, format);
};

export default genDiff;
