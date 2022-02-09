import _ from 'lodash';
import path from 'path';

const checkValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof (value) !== 'string') return value;
  return `'${value}'`;
};
const plain = (tree) => {
  const iter = (data, dataPath) => data.filter((node) => node.flag !== 'unchanged')
    .map((node) => {
      const newPath = path.join(dataPath, node.key).split('/').join('.');
      switch (node.flag) {
        case 'added': return `Property '${newPath}' was added with value: ${checkValue(node.value)}`;
        case 'deleted': return `Property '${newPath}' was removed`;
        case 'changed': return `Property '${newPath}' was updated. From ${checkValue(node.value1)} to ${checkValue(node.value2)}`;
        case 'object': return `${iter(node.child, `${newPath}`).join('\n').trimEnd()}`;
        default:
          throw new Error(`Этот тип не определен: ${node.flag}`);
      }
    });
  return `${iter(tree, '').join('\n')}`;
};

export default plain;
