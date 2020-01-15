import tree from './tree';
import plain from './plain';

const renderByFormat = {
  tree: (ast) => tree(ast),
  plain: (ast) => plain(ast),
};

export default (ast, format) => {
  const render = renderByFormat[format] || tree;
  return render(ast);
};
