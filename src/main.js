import parser from './parser.js';
import formatData from './formatters/index.js';
import createDiff from './createDiff.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);
  const result = createDiff(data1, data2);
  const genData = formatData(result, format);
  return genData;
};

export default genDiff;
