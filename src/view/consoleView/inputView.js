import SYMBOL from '../../constants/symbol.js';
import { INPUT_MESSAGE } from '../../constants/view-messages.js';
import readLineAsync from '../../utils/readLine.js';

const inputView = {
  async readPurchaseAmount() {
    const input = await readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
    return input;
  },

  async readWinningLottoNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.WINNING_LOTTO);
    return input.split(SYMBOL.DELIMITER);
  },

  async readBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    return input;
  },

  async readRestartGame() {
    const input = await readLineAsync(INPUT_MESSAGE.RESTART_GAME);
    return input;
  },
};

export default inputView;
