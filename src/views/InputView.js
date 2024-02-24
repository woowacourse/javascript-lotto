import Console from '../utils/Console';
import { INPUT_MESSAGES } from '../constants/messages';

const { readLineAsync } = Console;

const InputView = {
  async lottoPurchasePrice() {
    return readLineAsync(
      `${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.lottoPurchasePrice} `,
    );
  },

  async winningNumbers() {
    return readLineAsync(
      `${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.winningNumbers} `,
    );
  },

  async bonusNumber() {
    return readLineAsync(
      `${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.bonusNumber} `,
    );
  },

  async restart() {
    return readLineAsync(`${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.restart} `);
  },
};

export default InputView;
