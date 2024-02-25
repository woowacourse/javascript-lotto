import { QUERY_MESSAGE, NEW_LINE } from '../constants/message';
import Console from '../util/Console';

const InputView = {
  async askPurchaseAmount() {
    const purchaseAmount = await Console.readLineAsync(QUERY_MESSAGE.PURCHASE_AMOUNT);
    return purchaseAmount;
  },
  async askWinNumbers() {
    const winNumbers = await Console.readLineAsync(`${NEW_LINE}${QUERY_MESSAGE.WIN_NUMBERS}`);
    return winNumbers;
  },
  async askBonusNumber() {
    const bonusNumber = await Console.readLineAsync(`${NEW_LINE}${QUERY_MESSAGE.BONUS_NUMBER}`);
    return bonusNumber;
  },

  async askRestart() {
    const restartResponse = await Console.readLineAsync(`${NEW_LINE}${QUERY_MESSAGE.RESTART}`);
    return restartResponse;
  },
};

export default InputView;
