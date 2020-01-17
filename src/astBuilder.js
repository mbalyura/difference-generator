import _ from 'lodash';

const getAst = (objectBefore, objectAfter) => {
  const mergedObject = { ...objectBefore, ...objectAfter };

  return _.keys(mergedObject).sort().reduce((acc, key) => {
    const oldValue = objectBefore[key];
    const newValue = objectAfter[key];

    if (_.has(objectBefore, key) && _.has(objectAfter, key)) {
      if (_.isObject(oldValue) && _.isObject(newValue)) {
        return [...acc, { key, type: 'nested', children: getAst(oldValue, newValue) }];
      }
      if (oldValue === newValue) {
        return [...acc, { key, newValue, type: 'unchanged' }];
      }
      return [...acc, {
        key, oldValue, newValue, type: 'changed',
      }];
    }
    if (!_.has(objectAfter, key)) {
      return [...acc, { key, oldValue, type: 'deleted' }];
    }
    return [...acc, { key, newValue, type: 'added' }];
  }, []);
};

export default getAst;
