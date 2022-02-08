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
test('diff flat json fiel', async () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  expect(diffFile(firstFile, secondFile)).toBe(
    `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  );
});
test('diff flat yaml file', async () => {
  const firstFile = getFixturePath('filepath1.yml');
  const secondFile = getFixturePath('filepath2.yml');
  expect(diffFile(firstFile, secondFile)).toBe(
    `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  );
});
