import yaml from 'js-yaml';
import ini from 'ini';


const parserByDataType = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data, type) => {
  const parser = parserByDataType[type];
  const parsedData = parser(data);
  return parsedData;
};

export default parse;
