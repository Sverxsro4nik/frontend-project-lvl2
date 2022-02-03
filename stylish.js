import _ from 'lodash';

const stylish = (data1, data2, key) => {
  if (_.has(data1, key) && !_.has(data2, key)) {
    return `- ${key}: ${data1[key]}`;
  } if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
    return ` ${key}: ${data2[key]}`;
  } if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
    return `- ${key}: ${data1[key]} \n + ${key}: ${data2[key]}`;
  }
  return `+ ${key}: ${data2[key]}`;
};
export default stylish;

// const result = keys.reduce((acc, key) => {
//   if (_.has(firstFile, key) && !_.has(secondFile, key)) {
//     acc.push({ diff: '-', key, value: firstFile[key] });
//   }
//   if (_.has(firstFile, key) && _.has(secondFile, key) && firstFile[key] === secondFile[key]) {
//     acc.push({ diff: ' ', key, value: secondFile[key] });
//   }
//   if (_.has(firstFile, key) && _.has(secondFile, key) && firstFile[key] !== secondFile[key]) {
//     acc.push({ diff: '-', key, value: firstFile[key] });
//     acc.push({ diff: '+', key, value: secondFile[key] });
//   }
//   if (!_.has(firstFile, key) && _.has(secondFile, key)) {
//     acc.push({ diff: '+', key, value: secondFile[key] });
//   }
//   return acc;
// }, []);
