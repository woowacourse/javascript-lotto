import Console from '../utils/Console';

const InputView = {
  readUserInput(message, callback) {
    Console.read(message, (input) => {
      callback(input);
    });
  },
};

export default InputView;
