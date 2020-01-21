import _ from 'lodash';

const getAst = (objectBefore, objectAfter) => {
  const keys = _.keys({ ...objectBefore, ...objectAfter });

  return keys.sort().map((key) => {
    const oldValue = objectBefore[key];
    const newValue = objectAfter[key];

    if (_.has(objectBefore, key) && _.has(objectAfter, key)) {
      if (_.isObject(oldValue) && _.isObject(newValue)) {
        return { key, type: 'nested', children: getAst(oldValue, newValue) };
      }
      if (oldValue === newValue) {
        return { key, newValue, type: 'unchanged' };
      }
      return {
        key, oldValue, newValue, type: 'changed',
      };
    }
    if (!_.has(objectAfter, key)) {
      return { key, oldValue, type: 'deleted' };
    }
    return { key, newValue, type: 'added' };
  });
};

export default getAst;
