import MESSAGE from '../constants/message';
import Console from '../util/Console';

const InputView = {
  async askPurchaseAmount() {
    const purchaseAmount = await Console.readLineAsync(MESSAGE.QUERY.PURCHASE_AMOUNT);
    return purchaseAmount;
  },

  async askWinNumbers() {
    const winNumbers = await Console.readLineAsync(MESSAGE.QUERY.WIN_NUMBERS);
    return winNumbers.split(',').map((value) => Number(value));
  },
  async askBonusNumber() {
    const bonusNumber = await Console.readLineAsync(MESSAGE.QUERY.BONUS_NUMBER);
    return bonusNumber;
  },
};

export default InputView;
