import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import diffFile from '../main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
console.log(path.join(__dirname, '..', '__fixtures__', 'file1.json'));

console.log(path.join(__dirname, '..', '__fixtures__', 'file1.json'));
test('diff fiel', async () => {
  const firstFile = getFixturePath(`file1.json`);
  const secondFile = getFixturePath(`file2.json`);
  expect(diffFile(firstFile, secondFile)).toBe(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  );
});


