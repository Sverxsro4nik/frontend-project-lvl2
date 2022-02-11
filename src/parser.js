import path from 'path';
import { cwd } from 'process';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const parser = (file) => {
  const data = readFileSync(path.resolve(file) || cwd(file), 'utf-8');
  const fileExtension = path.extname(file);
  return fileExtension === '.json' ? JSON.parse(data) : load(data);
};

export default parser;
