import { INPUT_MESSAGE } from '../constants/constants.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import { LINE_BREAK } from '../constants/constants.js';
import validatePurchaseMoney from '../validations/validate/PurchaseMoneyValidate.js';

const InputHandler = {
  async getPurchaseMoney() {
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
};

export default InputHandler;
