import Console from '../utils/Console.js';

const InputView = {
  readUserInput(question) {
    return Console.question(question);
  },
};

export default InputView;
