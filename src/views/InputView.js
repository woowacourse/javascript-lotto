import { INPUT_MESSAGES } from '../constants/messages';
import Console from '../utils/Console';
const { readLineAsync } = Console;

const InputView = {
  async lottoPayment() {
    return readLineAsync(
      `${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.lottoPayment} `,
    );
  },

  async winningNumbers() {
    return readLineAsync(
      `${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.winningNumbers}`,
    );
  },

  async bonusNumber() {
    return readLineAsync(
      `${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.bonusNumber}`,
    );
  },
};

export default InputView;
