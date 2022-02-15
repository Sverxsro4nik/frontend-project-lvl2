import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

import parser from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (file) => readFileSync(file, 'utf-8');

test('parser yaml', () => {
  const firstFile = getFixturePath('filepath1.yml');
  const extension = path.extname(firstFile);
  const data = readFile(firstFile);
  const needData = load(readFileSync(firstFile, 'utf-8'));
  expect(parser(data, extension)).toStrictEqual(needData);
});

test('parser json', () => {
  const firstFile = getFixturePath('file1.json');
  const extension = path.extname(firstFile);
  const data = readFile(firstFile);
  const needData = JSON.parse(readFileSync(firstFile, 'utf-8'));
  expect(parser(data, extension)).toStrictEqual(needData);
});
