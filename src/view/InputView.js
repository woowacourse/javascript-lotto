import Console from '../utils/Console.js';

const InputView = {
  readUserInput(message, callback) {
    Console.read(message, (input) => {
      callback(input);
    });
  },
};

export default InputView;
