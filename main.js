import path from 'path';
import {cwd} from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';

const diffFile = (file1, file2) => {
  const firstFile = JSON.parse(readFileSync(path.resolve(file1) || cwd(file1)));
  const secondFile = JSON.parse(readFileSync(path.resolve(file2) || cwd(file2)));
  if (_.isEqual(firstFile, secondFile)) {
    console.log(firstFile);
  }
}


export default diffFile;