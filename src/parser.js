import path from 'path';
import { load } from 'js-yaml';

const parser = (data) => {
  const fileExtension = path.extname(data);
  return fileExtension === '.json' ? JSON.parse(data) : load(data);
};

export default parser;
