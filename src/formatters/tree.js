import _ from 'lodash';

const getSpaces = (depth) => ' '.repeat(depth);

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    const lines = _.keys(value).sort()
      .map((key) => `${getSpaces(depth + 6)}${key}: ${stringify(value[key], depth + 2)}`);
    return `{\n${lines.join('\n')}\n${getSpaces(depth + 2)}}`;
  }
  return value;
};

const render = (ast) => {
  const getLines = (nodes, depth = 2) => nodes.map((node) => {
    const {
      key, oldValue, newValue, type, children,
    } = node;

    const linesByType = {
      added: `${getSpaces(depth)}+ ${key}: ${stringify(newValue, depth)}`,
      deleted: `${getSpaces(depth)}- ${key}: ${stringify(oldValue, depth)}`,
      unchanged: `${getSpaces(depth)}  ${key}: ${stringify(newValue, depth)}`,
      changed: [`${getSpaces(depth)}- ${key}: ${stringify(oldValue, depth)}`,
        `${getSpaces(depth)}+ ${key}: ${stringify(newValue, depth)}`],
    };

    if (node.type === 'nested') {
      return [`${getSpaces(depth + 2)}${key}: {`,
        _.flatten(getLines(children, depth + 4)).join('\n'),
        `${getSpaces(depth + 2)}}`];
    }

    return linesByType[type];
  });

  const lines = _.flatten(getLines(ast)).join('\n');
  return `{\n${lines}\n}`;
};

export default render;
