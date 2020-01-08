import fs from 'fs';
import _ from 'lodash';
import path from 'path';


const genDiff = (path1, path2) => {
  const absolutePath1 = path.resolve(process.cwd(), path1);
  const absolutePath2 = path.resolve(process.cwd(), path2);

  const content1 = fs.readFileSync(absolutePath1, 'utf-8');
  const content2 = fs.readFileSync(absolutePath2, 'utf-8');

  const object1 = JSON.parse(content1);
  const object2 = JSON.parse(content2);

  console.log(object1, '\n', object2);
  // const result = object1.keys().reduce((acc, key) => {}, []);

};

export default genDiff;
