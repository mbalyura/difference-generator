import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : value);

const render = (ast) => {
  const getLines = (nodes, path) => nodes
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const {
        key, oldValue, newValue, type, children,
      } = node;

      const currentPath = path ? `${path}.${key}` : `${key}`;

      const linesByType = {
        added: () => `Property '${currentPath}' was ${type} with value: ${stringify(newValue)}`,
        deleted: () => `Property '${currentPath}' was ${type}`,
        changed: () => `Property '${currentPath}' was ${type}. From '${stringify(oldValue)}' to '${stringify(newValue)}'`,
        nested: () => getLines(children, currentPath),
      };

      return linesByType[type]();
    });

  const lines = getLines(ast).flat().join('\n');
  return lines;
};

export default render;
