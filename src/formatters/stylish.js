import _ from 'lodash';

const step = (depth, replacer = ' ', spaceCount = 4) => replacer.repeat(spaceCount * depth - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${step(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${step(depth)}  }`,
  ].join('\n');
};

const stylish = (changedTree) => {
  const iter = (data, depth) => data.map((node) => {
    const createString = (value, flag) => `${step(depth)}${flag} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.flag) {
      case 'added':
        return createString(node.value, '+');
      case 'deleted':
        return createString(node.value, '-');
      case 'unchanged':
        return createString(node.value, ' ');
      case 'changed':
        return `${createString(node.value1, '-')}${createString(node.value2, '+')}`;
      case 'object':
        return `${step(depth)}  ${node.key}: {\n${iter(node.child, depth + 1).join('')}${step(depth)}  }\n`;
      default:
        throw new Error(`Этот тип не определен: ${node.flag}`);
    }
  });
  return `{\n${iter(changedTree, 1).join('')}}`;
};

export default stylish;
