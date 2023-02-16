import Console from '../utils/Console.js';

const InputView = {
  readUserInput(question, callback) {
    return Console.question(question, (input) => callback(input));
  },
};

export default InputView;
