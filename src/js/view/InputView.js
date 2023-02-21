import Console from '../utils/Console.js';

const InputView = {
  async readUserInput(message) {
    return await Console.read(message);
  },
};

export default InputView;
