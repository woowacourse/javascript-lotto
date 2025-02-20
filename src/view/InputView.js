import readUserInput from '../utils/readUserInput.js';

const InputView = {
  async readUserInput(message) {
    return await readUserInput(message);
  },
};

export default InputView;
