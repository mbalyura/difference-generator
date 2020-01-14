import _ from 'lodash';

const render = (ast) => {
  const getSpaces = (depth) => ' '.repeat(depth);

  const stringify = (value, depth) => {
    if (_.isObject(value)) {
      const lines = Object.keys(value).sort().map((key) => `${getSpaces(depth + 6)}${key}: ${value[key]}`);
      return `{\n${lines.join('\n')}\n${getSpaces(depth + 2)}}`;
    }
    return value;
  };

  const getLines = (nodes, depth = 2) => nodes.map((node) => {
    const {
      key, value, beforeValue, afterValue, type, children,
    } = node;

    if (children) {
      return [`${getSpaces(depth + 2)}${key}: {`,
        _.flatten(getLines(children, depth + 4)).join('\n'),
        `${getSpaces(depth + 2)}}`];
    }

    const linesByType = {
      added: `${getSpaces(depth)}+ ${key}: ${stringify(value, depth)}`,
      deleted: `${getSpaces(depth)}- ${key}: ${stringify(value, depth)}`,
      unchanged: `${getSpaces(depth)}  ${key}: ${stringify(value, depth)}`,
      changed: [`${getSpaces(depth)}- ${key}: ${stringify(beforeValue, depth)}`,
        `${getSpaces(depth)}+ ${key}: ${stringify(afterValue, depth)}`].join('\n'),
    };
    return linesByType[type];
  });

  const lines = _.flatten(getLines(ast)).join('\n');
  return `{\n${lines}\n}`;
};

export default render;
