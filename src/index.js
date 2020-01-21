import fs from 'fs';
import path from 'path';
import parse from './parser';
import getAst from './astBuilder';
import render from './formatters';

const readFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return data;
};

const genDiff = (pathToBefore, pathToAfter, format) => {
  const typeBefore = path.extname(pathToBefore);
  const typeAfter = path.extname(pathToAfter);

  const dataBefore = readFile(pathToBefore);
  const dataAfter = readFile(pathToAfter);

  const objectBefore = parse(dataBefore, typeBefore);
  const objectAfter = parse(dataAfter, typeAfter);

  const ast = getAst(objectBefore, objectAfter);

  return render(ast, format);
};

export default genDiff;
