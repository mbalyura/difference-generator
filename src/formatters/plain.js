import _ from 'lodash';

const render = (ast) => {
  const getLines = (nodes, path) => nodes.map((node) => {
    const {
      key, value, beforeValue, afterValue, type, children,
    } = node;
    const currentPath = path ? `${path}.${key}` : `${key}`;
    const getCurrentValue = (val) => (_.isObject(val) ? '[complex value]' : val);

    if (children) {
      return getLines(children, currentPath);
    }

    const linesByType = {
      added: `Property '${currentPath}' was ${type} with value: ${getCurrentValue(value)}`,
      deleted: `Property '${currentPath}' was ${type}`,
      changed: `Property '${currentPath}' was updated. From '${getCurrentValue(beforeValue)}' to '${getCurrentValue(afterValue)}'`,
    };
    return linesByType[type];
  }).filter((node) => node);

  const lines = _.flattenDeep(getLines(ast)).join('\n');
  return lines;
};

export default render;
