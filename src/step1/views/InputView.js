import Console from '../utils/Console';
import { INPUT_MESSAGES } from '../constants/messages';

const { readLineAsync } = Console;

const inputView = {
  async lottoPayment() {
    return readLineAsync(
      `${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.lottoPayment} `,
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

  async reStart() {
    return readLineAsync(`${INPUT_MESSAGES.prefix} ${INPUT_MESSAGES.reStart} `);
  },
};

export default inputView;
