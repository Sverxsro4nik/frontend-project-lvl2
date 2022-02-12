import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { expect, test } from '@jest/globals';
import diffFile from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (dataPath) => readFileSync(dataPath, 'utf-8');

test('diff flat json fiel', async () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  const result = getFixturePath('needStylishData.txt');
  expect(diffFile(firstFile, secondFile, 'stylish')).toBe(readFile(result));
});
test('diff flat yaml file', async () => {
  const firstFile = getFixturePath('filepath1.yml');
  const secondFile = getFixturePath('filepath2.yml');
  const result = getFixturePath('needStylishData.txt');
  expect(diffFile(firstFile, secondFile, 'stylish')).toBe(readFile(result));
});

test('flat format', async () => {
  const firstFile = getFixturePath('filepath1.yml');
  const secondFile = getFixturePath('filepath2.yml');
  const result = getFixturePath('needPlainData.txt');
  expect(diffFile(firstFile, secondFile, 'plain')).toBe(readFile(result));
});

test('json format', async () => {
  const firstFile = getFixturePath('filepath1.yml');
  const secondFile = getFixturePath('filepath2.yml');
  const result = getFixturePath('resultJson.txt');
  expect(diffFile(firstFile, secondFile, 'json')).toStrictEqual(readFile(result));
});
