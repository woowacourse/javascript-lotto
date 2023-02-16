import Console from '../utils/Console';

const OutputView = {
  printErrorMessage(message) {
    Console.print(`[ERROR] ${message}`);
  },
};

export default OutputView;
