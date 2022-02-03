import _ from 'lodash';
import parser from './parser.js';
import stylish from './stylish.js';

const diff = (data1, data2) => {
  if (!_.isObject(data1)) return data1;
  const keys = _.uniq(_.concat(_.keys(data1), _.keys(data2)));
  const data = keys.flatMap((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) return diff(data1[key], data2[key]);
    return stylish(data1, data2, key);
  });
  return data;
};

const diffFile = (file1, file2) => {
  const firstFile = parser(file1);
  const secondFile = parser(file2);
  const result = diff(firstFile, secondFile);
  console.log(result);
  return result;
  // const sorted = _.sortBy(result, (obg) => obg.key);
  // const arr = sorted.map(({ diff, key, value }) => `  ${diff} ${key}: ${value}\n`);
  // const finallyString = `{\n${arr.join('').trimEnd()}\n}`;
  // console.log(finallyString);
  // return finallyString;
};

export default diffFile;
