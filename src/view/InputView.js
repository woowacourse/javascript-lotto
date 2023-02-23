import Console from '../utils/Console';

const InputView = {
  readUserInput(question) {
    return Console.question(question);
  },
};

export default InputView;
