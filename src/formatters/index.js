import plain from './plain.js';
import stylish from './stylish.js';

const formatData = (tree, format) => {
  switch (format) {
    case 'stylish': return stylish(tree);
    case 'plain': return plain(tree);
    default:
      throw new Error('This formatter does not exist.');
  }
};

export default formatData;
