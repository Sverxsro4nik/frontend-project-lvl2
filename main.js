import path from 'path';
import {cwd} from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';

const diffFile = (file1, file2) => {
  const firstFile = readFileSync(path.resolve(file1) || cwd(file1));
  const secondFile = readFileSync(path.resolve(file2) || cwd(file2));
  let firstData;
  let secondData;
  if (path.extname(file1) === '.json' && path.extname(file2) === '.json') {
    firstData = JSON.parse(firstFile);
    secondData = JSON.parse(secondFile);
  }
  const keys = _.uniq(_.concat(_.keys(firstData), _.keys(secondData)));
  const result = keys.reduce((acc , key) => {
    if (_.has(firstData, key) && !_.has(secondData, key)){
      acc.push({diff: '-', key, value: firstData[key]});
    }
    if (_.has(firstData, key) && _.has(secondData, key) && firstData[key] === secondData[key]) {
      acc.push({diff: ' ', key, value: firstData[key]});
    }
    if (_.has(firstData, key) && _.has(secondData, key) && firstData[key] !== secondData[key]) {
      acc.push({diff: '-', key, value: firstData[key]});
      acc.push({diff: '+', key, value: secondData[key]});
    }
    if (!_.has(firstData, key) && _.has(secondData, key)) {
      acc.push({diff: '+', key, value: secondData[key]});
    }
    return acc;
  }, []);
  const sorted = _.sortBy(result, (obg) => obg.key);
  const arr = sorted.map(({diff, key, value}) => `  ${diff} ${key}: ${value}\n`);
  const finallyString = `{\n${arr.join('').trimEnd()}\n}`;
  console.log(finallyString);
  return finallyString;
};
export default diffFile;