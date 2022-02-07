import _ from 'lodash';
import parser from './parser.js';

const createDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.uniq(_.concat(keys1, keys2));
  const sortedkeys = _.sortBy(uniqKeys);
  const diffTree = sortedkeys.reduce((acc, key) => {
    if (_.isObject(data1[key]) && (_.isObject(data2[key]))) {
      acc[key] = createDiff(data1[key], data2[key]);
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      acc[key] = 'deleted';
    } else if (!_.has(data1, key) && _.has(data2, key)) {
      acc[key] = 'added';
    } else if (_.has(data1, key) && _.has(data2, key)) {
      acc[key] = data1[key] === data2[key] ? 'unchanged' : 'changed';
    }
    return acc;
  }, {});
  console.log(diffTree);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);

  const result = createDiff(data1, data2);
  return result;
};

export default genDiff;
