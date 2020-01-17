import tree from './tree';
import plain from './plain';
import json from './json';

const renderByFormat = {
  tree: (ast) => tree(ast),
  plain: (ast) => plain(ast),
  json: (ast) => json(ast),
};

export default (ast, format) => {
  const render = renderByFormat[format] || tree;
  return render(ast);
};
