import _ from 'lodash';
import parser from './parser.js';
import stylish from './stylish.js';

const createDiff = (data1, data2) => {
  // const keys = Object.keys({ ...data1, ...data2 });
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.uniq(_.concat(keys1, keys2));
  const sortedkeys = _.sortBy(uniqKeys);
  const diffTree = sortedkeys.flatMap((key) => {
    const valueData1 = data1[key];
    const valueData2 = data2[key];
    if (_.has(data1, key) && !_.has(data2, key)) {
      // console.log({ flag: 'deleted', key, value: valueData1 });
      return { flag: 'deleted', key, value: valueData1 };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      // console.log({ flag: 'added', key, value: valueData2 });
      return { flag: 'added', key, value: valueData2 };
    }
    if (_.isPlainObject(valueData1) && _.isPlainObject(valueData2)) {
      // console.log({ flag: 'object', key, child: createDiff(valueData1, valueData2) });
      return { flag: 'object', key, child: createDiff(valueData1, valueData2) };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (valueData1 !== valueData2) {
        // console.log({
        //   flag: 'changed', key, value1: valueData1, value2: valueData2,
        // });
        return {
          flag: 'changed', key, value1: valueData1, value2: valueData2,
        };
      }
    }
    // console.log({ flag: 'unchanged', key, value: valueData1 });
    return { flag: 'unchanged', key, value: valueData1 };
  });
  return diffTree;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);

  const result = createDiff(data1, data2);
  const genData = stylish(result);
  console.log(genData);
};

export default genDiff;
