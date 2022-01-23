import _ from 'lodash';
import parser from './parser.js';

const diffFile = (file1, file2) => {
  const firstFile = parser(file1);
  const secondFile = parser(file2);
  const keys = _.uniq(_.concat(_.keys(firstFile), _.keys(secondFile)));
  const result = keys.reduce((acc, key) => {
    if (_.has(firstFile, key) && !_.has(secondFile, key)) {
      acc.push({ diff: '-', key, value: firstFile[key] });
    }
    if (_.has(firstFile, key) && _.has(secondFile, key) && firstFile[key] === secondFile[key]) {
      acc.push({ diff: ' ', key, value: secondFile[key] });
    }
    if (_.has(firstFile, key) && _.has(secondFile, key) && firstFile[key] !== secondFile[key]) {
      acc.push({ diff: '-', key, value: firstFile[key] });
      acc.push({ diff: '+', key, value: secondFile[key] });
    }
    if (!_.has(firstFile, key) && _.has(secondFile, key)) {
      acc.push({ diff: '+', key, value: secondFile[key] });
    }
    return acc;
  }, []);
  const sorted = _.sortBy(result, (obg) => obg.key);
  const arr = sorted.map(({ diff, key, value }) => `  ${diff} ${key}: ${value}\n`);
  const finallyString = `{\n${arr.join('').trimEnd()}\n}`;
  console.log(finallyString);
  return finallyString;
};
export default diffFile;
