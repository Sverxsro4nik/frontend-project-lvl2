import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

import parser from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('parser', async () => {
  const firstFile = getFixturePath('flat-filepath1.yml');
  const needData = load(readFileSync(firstFile, 'utf-8'));
  console.log(needData);
  expect(parser(firstFile)).toStrictEqual(needData);
});

test('parser json', async () => {
  const firstFile = getFixturePath('flat-file1.json');
  const needData = JSON.parse(readFileSync(firstFile, 'utf-8'));
  expect(parser(firstFile)).toStrictEqual(needData);
});
