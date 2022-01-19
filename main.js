import path from 'path';
import {cwd} from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';

const diffFile = (file1, file2) => {
  const firstFile = JSON.parse(readFileSync(path.resolve(file1) || cwd(file1)));
  const secondFile = JSON.parse(readFileSync(path.resolve(file2) || cwd(file2)));
  const keys = _.uniq(_.concat(_.keys(firstFile), _.keys(secondFile)));
  const result = keys.reduce((acc , key) => {
    if (_.has(firstFile, key) && !_.has(secondFile, key)){
      acc.push({diff: '- ', key, value: firstFile[key]});
    }
    if (_.has(firstFile, key) && _.has(secondFile, key) && firstFile[key] === secondFile[key]) {
      acc.push({diff: '  ', key, value: firstFile[key]});
    }
    if (_.has(firstFile, key) && _.has(secondFile, key) && firstFile[key] !== secondFile[key]) {
      acc.push({diff: '-', key, value: firstFile[key]});
      acc.push({diff: '+', key, value: secondFile[key]});
    }
    if (!_.has(firstFile, key) && _.has(secondFile, key)) {
      acc.push({diff: '+', key, value: secondFile[key]});
    }
    return acc;
  }, []);
  const sorted = _.sortBy(result, (obg) => obg.key);
  const arr = sorted.map(({diff, key, value}) => `\t${diff} ${key}: ${value}\n`);
  console.log(`{
    ${arr.join('')}}`);

};
export default diffFile;