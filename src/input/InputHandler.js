import { INPUT_MESSAGE } from '../constants/constants.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import { LINE_BREAK, LOTTO_NUMBER_DELIMITER } from '../constants/constants.js';
import validatePurchaseMoney from '../validations/validate/PurchaseMoneyValidate.js';
import Lotto from '../domain/Lotto.js';

const InputHandler = {
  async purchaseMoney() {
    while (true) {
      try {
        const purchaseMoney = await InputView.readUserInput(INPUT_MESSAGE.PURCHASE_MONEY);
        validatePurchaseMoney(Number(purchaseMoney));
        OutputView.print(LINE_BREAK);
        return purchaseMoney;
      } catch (e) {
        OutputView.print(e.message);
      }
    }
  },

  async winningNumbers() {
    while (true) {
      try {
        const winningNumbers = await InputView.readUserInput(INPUT_MESSAGE.WINNING_NUMBERS);
        OutputView.print(LINE_BREAK);
        return new Lotto(winningNumbers.split(LOTTO_NUMBER_DELIMITER).map(num => Number(num)));
      } catch (e) {
        OutputView.print(e.message);
      }
    }
  },
};



export default InputHandler;
