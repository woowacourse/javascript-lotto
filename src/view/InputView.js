import Console from '../utils/Console.js';

const InputView = {
  async readUserInput(message) {
    const input = await Console.read(message);
    return input;
  },
};

export default InputView;
