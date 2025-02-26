import { SYSTEM_MESSAGE } from '../../constants/MESSAGES.js';
import readLineAsync from '../../utils/readLineAsync.js';
import { getById } from '../../utils/DOM.js';

const InputView = {
  enterPurchasePrice() {
    const $purchaseInput = getById('purchaseInput');
    const $purchaseForm = document.querySelector('section.purchase form');
    return new Promise((resolve) => {
      $purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resolve($purchaseInput.value);
      });
    });
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
