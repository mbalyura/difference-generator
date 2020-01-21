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

const getExtension = (filePath) => path.extname(filePath).substr(1);

const genDiff = (pathToBefore, pathToAfter, format) => {
  const dataBefore = readFile(pathToBefore);
  const typeBefore = getExtension(pathToBefore);
  const objectBefore = parse(dataBefore, typeBefore);

  const dataAfter = readFile(pathToAfter);
  const typeAfter = getExtension(pathToAfter);
  const objectAfter = parse(dataAfter, typeAfter);

  const ast = getAst(objectBefore, objectAfter);

  return render(ast, format);
};

export default genDiff;
