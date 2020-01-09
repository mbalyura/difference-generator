import fs from 'fs';
import _ from 'lodash';
import path from 'path';


const genDiff = (pathToBefore, pathToAfter) => {
  const absolutePathToBefore = path.resolve(process.cwd(), pathToBefore);
  const absolutePathToAfter = path.resolve(process.cwd(), pathToAfter);

  const contentBefore = fs.readFileSync(absolutePathToBefore, 'utf-8');
  const contentAfter = fs.readFileSync(absolutePathToAfter, 'utf-8');

  const objectBefore = JSON.parse(contentBefore);
  const objectAfter = JSON.parse(contentAfter);
  const mergedObject = { ...objectBefore, ...objectAfter };

  const result = Object.keys(mergedObject).reduce((acc, key) => {
    const beforeValue = objectBefore[key];
    const afterValue = objectAfter[key];
    if (_.has(objectBefore, key) && _.has(objectAfter, key)) {
      if (beforeValue === afterValue) {
        acc.push(`${key}: ${beforeValue}`);
      } else {
        acc.push(`- ${key}: ${beforeValue}`, `+ ${key}: ${afterValue}`);
      }
    } else if (!_.has(objectAfter, key)) {
      acc.push(`- ${key}: ${beforeValue}`);
    } else if (!_.has(objectBefore, key)) {
      acc.push(`+ ${key}: ${afterValue}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
