import path from 'path';
import { cwd } from 'process';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const parser = (file) => {
  const data = readFileSync(path.resolve(file) || cwd(file), 'utf-8');
  const fileExtension = path.extname(file);
  let resultData;
  if (fileExtension === '.json') {
    resultData = JSON.parse(data);
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    resultData = load(data);
  }
  return resultData;
};

export default parser;
