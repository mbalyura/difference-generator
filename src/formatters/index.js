import tree from './tree';
import plain from './plain';
import json from './json';

const renderByFormat = {
  tree, plain, json,
};

export default (ast, format) => {
  const render = renderByFormat[format] || tree;
  return render(ast);
};
