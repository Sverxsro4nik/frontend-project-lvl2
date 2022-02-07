import _ from 'lodash';
import parser from './parser.js';
import stylish from './stylish.js';

const createDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.uniq(_.concat(keys1, keys2));
  const sortedkeys = _.sortBy(uniqKeys);
  const diffTree = sortedkeys.flatMap((key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { flag: 'deleted', dataKey: key, value1: data1[key] };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { flag: 'added', dataKey: key, value1: data2[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { flag: 'object', dataKey: key, value1: createDiff(data1[key], data2[key]) };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        return {
          flag: 'changed', dataKey: key, value1: data1[key], value2: data2[key],
        };
      }
    }
    return { flag: 'unchanged', dataKey: key, value1: data1[key] };
  });
  return diffTree;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);

  const result = createDiff(data1, data2);
  // console.log(result);
  const genData = stylish(result);
  console.log(genData);
};

export default genDiff;
