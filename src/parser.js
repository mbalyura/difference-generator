import yaml from 'js-yaml';

const ParserByDataType = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

const parse = (data, type) => {
  const parser = ParserByDataType[type];
  const parsedData = parser(data);
  return parsedData;
};

export default parse;
