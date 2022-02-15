import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (dataPath) => readFileSync(dataPath, 'utf-8');

const testFields = [
  ['file1.json', 'file2.json', 'needStylishData.txt', 'stylish'],
  ['filepath1.yml', 'filepath2.yml', 'needStylishData.txt', 'stylish'],
  ['file1.json', 'file2.json', 'needPlainData.txt', 'plain'],
  ['filepath1.yml', 'filepath2.yml', 'needPlainData.txt', 'plain'],
  ['file1.json', 'file2.json', 'resultJson.txt', 'json'],
  ['filepath1.yml', 'filepath2.yml', 'resultJson.txt', 'json'],
];

test.each(testFields)('Comparison %s and %s and check the identity of the received %s', (firstFile, secondFile, needResult, format) => {
  const firstData = getFixturePath(firstFile);
  const secondData = getFixturePath(secondFile);
  const resultData = readFile(getFixturePath(needResult));
  const result = genDiff(firstData, secondData, format);
  expect(result).toEqual(resultData);
});
