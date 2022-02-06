import _ from 'lodash';
import parser from './parser.js';
import stylish from './stylish.js';

const diff = (data1, data2) => {
  if (!_.isObject(data1)) {
    return data1;
  }
  const keys = _.uniq(_.concat(_.keys(data1), _.keys(data2)));
  // const value1 = Object.values(data1);
  // const value2 = Object.values(data2);
  const data = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      console.log(diff(data1[key], data2[key]));
      return diff(data1[key], data2[key]);
//      return `${key}: {\n${diff(data1[key], data2[key], depth + 2)}\n${step.repeat(depth)}}`;
    }
    return stylish(data1, data2, key);
    // console.log(stylish(data1, data2, key));
    // return stylish(data1, data2, key);
  });
  return data;
};

const diffFile = (file1, file2) => {
  const firstFile = parser(file1);
  const secondFile = parser(file2);
  const result = diff(firstFile, secondFile, 0);
  // console.log(result.join('\n'));
  // return result.join('');
  // const sorted = _.sortBy(result, (obg) => obg.key);
  // const arr = sorted.map(({ diff, key, value }) => `  ${diff} ${key}: ${value}\n`);
  // const finallyString = `{\n${arr.join('').trimEnd()}\n}`;
  // console.log(finallyString);
  // return finallyString;
};

export default diffFile;
