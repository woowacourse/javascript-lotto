import { SYSTEM_MESSAGE } from "../constants/MESSAGES.js";
import readLineAsync from "../utils/readLineAsync.js";

const InputView = {
  enterPurchasePrice: async function () {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_PURCHASE_PRICE);
  },

  enterWinningNumbers: async function () {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_WINNING_NUMBERS);
  },

  enterBonusNumber: async function () {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_BONUS_NUMBER);
  },

  enterRestart: async function () {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_RESTART);
  },
};

export default InputView;
