import { load } from 'js-yaml';

const parser = (data, type) => {
  switch (type) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return load(data);
    default:
      throw new Error(`${type} - данный тип файлов не используется программой`);
  }
};

export default parser;
