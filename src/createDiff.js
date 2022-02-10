import _ from 'lodash';

const createDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.uniq(_.concat(keys1, keys2));
  const sortedkeys = _.sortBy(uniqKeys);
  const diffTree = sortedkeys.flatMap((key) => {
    const valueData1 = data1[key];
    const valueData2 = data2[key];
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { flag: 'deleted', key, value: valueData1 };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { flag: 'added', key, value: valueData2 };
    }
    if (_.isPlainObject(valueData1) && _.isPlainObject(valueData2)) {
      return { flag: 'object', key, child: createDiff(valueData1, valueData2) };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (valueData1 !== valueData2) {
        return {
          flag: 'changed', key, value1: valueData1, value2: valueData2,
        };
      }
    }
    return { flag: 'unchanged', key, value: valueData1 };
  });
  return diffTree;
};

export default createDiff;
