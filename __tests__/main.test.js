import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diffFile from '../main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff fiel', async () => {
  const firstFile = getFixturePath('flat-file1.json');
  const secondFile = getFixturePath('flat-file2.json');
  expect(diffFile(firstFile, secondFile)).toBe(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});

test('diff yaml file', async () => {
  const firstFile = getFixturePath('flat-filepath1.yml');
  const secondFile = getFixturePath('flat-filepath2.yml');
  expect(diffFile(firstFile, secondFile)).toBe(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});
