import _ from 'lodash';
import parser from './parser.js';
// 1. Получаем два файла
// 2. Парсим данные
// 3. Начинаем сравнение по ключам и данным и формируем данные с плоскими данными
// 3.1 Получаем ключи обоих файлов
// 3.2 Сливаем ключи в один массив
// 3.3 Формируем массив с уникальными ключами
// 3.4 Проводим сравнение и формируем результат
// 4 Сравниваем файлы с вложенностями
// 4.1 Проверяем является ли значение по ключу объектом,
//     если да то проваливаемся в него и начинаем сравнением
// 3. Функция сравнения данных
const createDif = (sigh, key, data) => `${sigh} ${key}: ${data}`;
const inTree = (data) => {
  if (!_.isObject(data)) return data;
  const entries = Object.entries(data);
  const result = entries.map(([key, entri]) => {
    if (_.isObject(entri)) return createDif(' ', key, `{${inTree(entri)}}`);
    return createDif(' ', key, entri);
  });
  return result;
};

const createTree = (data1, data2) => {
  // 3.1 Получаем ключи обоих файлов
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  // 3.2 Сливаем ключи в один массив
  const allKeys = _.concat(keys1, keys2);
  // 3.3 Формируем массив с уникальными ключами
  const uniqKeys = _.uniq(allKeys);
  // 3.4 Проводим сравнение и формируем результат
  const result = uniqKeys.reduce((acc, key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      acc[key] = createTree(data1[key], data2[key]);
      // acc.push(`${key}: {${createTree(data1[key], data2[key])}}`);
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      if (_.isObject(data2[key])) {
        acc[key] = { dif: '+', key, value: inTree(data2[key]) };
        // acc.push(`${createDif('+', key, `{${inTree(data2[key])}}`)}`);
      }
      acc[key] = { dif: '+', key, value: data2[key] };
      // acc.push(createDif('+', key, data2[key]));
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      if (_.isObject(data1[key])) {
        acc[key] = { dif: '-', key, value: inTree(data1[key]) };
        // acc.push(`${createDif('-', key, `{${inTree(data1[key])}}`)}`);
      }
      acc[key] = { dif: '-', key, value: data1[key] };
      // acc.push(createDif('-', key, data1[key]));
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        acc[key] = { dif: '-', key, value: inTree(data1[key]) };
        // acc.push(`${createDif('-', key, `{${inTree(data1[key])}}`)}`);
      }
      acc[key] = [
        { dif: '-', key, value: inTree(data1[key]) },
        { dif: '+', key, value: inTree(data2[key]) },
      ];
      // acc.push([createDif('+', key, data2[key]), createDif('-', key, data1[key])]);
    } else {
      acc[key] = { dif: ' ', key, value: inTree(data1[key]) };
    }
    return acc;
    // if (_.isObject(data1[key]) && _.isObject(data2[key])) {
    //   return `${key}: {${createTree(data1[key], data2[key])}}`;
    // }
    // if (!_.has(data1, key) && _.has(data2, key)) {
    //   if (_.isObject(data2[key])) {
    //     return `${createDif('+', key, `{${inTree(data2[key])}}`)}`;
    //   }
    //   return createDif('+', key, data2[key]);
    // }
    // if (_.has(data1, key) && !_.has(data2, key)) {
    //   if (_.isObject(data1[key])) {
    //     return `${createDif('-', key, `{${inTree(data1[key])}}`)}`;
    //   }
    //   return createDif('-', key, data1[key]);
    // }
    // if (_.has(data1, key) && _.has(data2, key)) {
    //   if (data1[key] !== data2[key]) {
    //     if (_.isObject(data1[key])) {
    //       return `${createDif('-', key, `{${inTree(data1[key])}}`)}`;
    //     }
    //     return [createDif('+', key, data2[key]), createDif('-', key, data1[key])];
    //   }
    // }
    // return createDif(' ', key, data1[key]);
  }, {});
  return result;
};

// 1. Получаем два файла
const genDiff = (filepath1, filepath2) => {
  // 2. Парсим данные
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);
  // 3. Начинаем сравнение по ключам и данным и формируем данные с плоскими данными
  const result = createTree(data1, data2);
  console.log(result);
  return result;
};

export default genDiff;
