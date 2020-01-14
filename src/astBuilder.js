import _ from 'lodash';

const getAst = (objectBefore, objectAfter) => {
  const mergedObject = { ...objectBefore, ...objectAfter };

  return Object.keys(mergedObject).sort().reduce((acc, key) => {
    const beforeValue = objectBefore[key];
    const afterValue = objectAfter[key];

    if (_.has(objectBefore, key) && _.has(objectAfter, key)) {
      if (_.isObject(beforeValue) && _.isObject(afterValue)) {
        return [...acc, { key, children: getAst(beforeValue, afterValue) }];
      }
      if (beforeValue === afterValue) {
        return [...acc, { key, value: beforeValue, type: 'unchanged' }];
      }
      return [...acc, {
        key, beforeValue, afterValue, type: 'changed',
      }];
    }
    if (!_.has(objectAfter, key)) {
      return [...acc, { key, value: beforeValue, type: 'deleted' }];
    }
    return [...acc, { key, value: afterValue, type: 'added' }];
  }, []);
};

export default getAst;
