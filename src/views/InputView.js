import { INPUT_MESSAGES } from '../constants';
import Console from '../utils/Console';

const InputView = {
  async readPaymentAmount() {
    return await Console.readLineAsync(INPUT_MESSAGES.paymentAmount);
  },

  async readWinningLottoNumbers() {
    return await Console.readLineAsync(INPUT_MESSAGES.winningLottoNumbers);
  },

  async readBonusNumber() {
    return await Console.readLineAsync(INPUT_MESSAGES.bonusNumber);
  },

  async readRestart() {
    return await Console.readLineAsync(INPUT_MESSAGES.restart);
  },
};

export default InputView;
