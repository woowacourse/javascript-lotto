import { SYSTEM_MESSAGE } from '../constants/MESSAGES.js';
import readLineAsync from '../utils/readLineAsync.js';

const InputView = {
  async enterPurchasePrice() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_PURCHASE_PRICE);
  },

  async enterWinningNumbers() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_WINNING_NUMBERS);
  },

  async enterBonusNumber() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_BONUS_NUMBER);
  },

  async enterRestart() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_RESTART);
  },
};

export default InputView;
