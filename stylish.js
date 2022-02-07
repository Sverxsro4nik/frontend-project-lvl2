import _ from 'lodash';

const step = (depth, replacer = ' ', spaceCount = 4) => replacer.repeat(spaceCount * depth - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const lines = Object
    .entries(data)
    .map(([, { flag, dataKey, value1 }]) => `${step(depth + 1)}${flag} ${dataKey}: ${stringify(value1, depth + 1)}`);
  return [
    '{',
    ...lines,
    '}',
  ].join('\n');
};

const stylish = (changedTree) => {
  const iter = (data, depth) => data.map((node) => {
    const getNodeValue = (value, flag) => `${step(depth)}${flag} ${node.dataKey}: ${stringify(value, depth)}\n`;
    switch (node.flag) {
      case 'added':
        return getNodeValue(node.value1, '+');
      case 'deleted':
        return getNodeValue(node.value1, '-');
      case 'unchanged':
        return getNodeValue(node.value1, ' ');
      case 'changed':
        return `${getNodeValue(node.value1, '-')}${getNodeValue(node.value2, '+')}`;
      case 'object':
        return `${step(depth)} ${node.dataKey}: {\n${iter(node.value1, depth + 1).join('')}${step(depth)} }\n`;
      default:
        throw new Error(`Этот тип не определен: ${node.flag}`);
    }
  });
  return `{\n${iter(changedTree, 1).join('')}}`;
};

export default stylish;
