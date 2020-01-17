import _ from 'lodash';

const render = (ast) => {
  const getCurrentValue = (value) => (_.isObject(value) ? '[complex value]' : value);

  const getLines = (nodes, path) => nodes
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const {
        key, oldValue, newValue, type, children,
      } = node;

      const currentPath = path ? `${path}.${key}` : `${key}`;

      const linesByType = {
        added: `Property '${currentPath}' was ${type} with value: ${getCurrentValue(newValue)}`,
        deleted: `Property '${currentPath}' was ${type}`,
        changed: `Property '${currentPath}' was ${type}. From '${getCurrentValue(oldValue)}' to '${getCurrentValue(newValue)}'`,
      };

      if (node.type === 'nested') {
        return getLines(children, currentPath);
      }

      return linesByType[type];
    });

  const lines = _.flattenDeep(getLines(ast)).join('\n');
  return lines;
};

export default render;
