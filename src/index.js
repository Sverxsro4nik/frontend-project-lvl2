import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import parser from './parser.js';
import formatData from './formatters/index.js';
import createDiff from './createDiff.js';

const readFile = (file) => readFileSync(path.resolve(file) || cwd(file), 'utf-8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const firstFileExtension = path.extname(filepath1);
  const secondFileExtension = path.extname(filepath2);
  const parseData1 = parser(data1, firstFileExtension);
  const parseData2 = parser(data2, secondFileExtension);
  const result = createDiff(parseData1, parseData2);
  const genData = formatData(result, format);
  return genData;
};

export default genDiff;
