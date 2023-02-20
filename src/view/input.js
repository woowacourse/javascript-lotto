import readlineInterface from '../util/readlineInterface.js';

const input = (message) => {
  return new Promise((resolve) => {
    readlineInterface.question(message, resolve);
  });
};

export default input;
