import { QUERY_MESSAGE } from '../constants/message';
import Console from '../util/Console';

const InputView = {
  async askPurchaseAmount() {
    const purchaseAmount = await Console.readLineAsync(QUERY_MESSAGE.PURCHASE_AMOUNT);
    return purchaseAmount;
  },
  async askWinNumbers() {
    const winNumbers = await Console.readLineAsync(QUERY_MESSAGE.WIN_NUMBERS);
    return winNumbers.split(',').map((value) => Number(value));
  },
  async askBonusNumber() {
    const bonusNumber = await Console.readLineAsync(QUERY_MESSAGE.BONUS_NUMBER);
    return bonusNumber;
  },

  async askRestart() {
    const restartResponse = await Console.readLineAsync(QUERY_MESSAGE.RESTART);
    return restartResponse;
  },
};

export default InputView;
