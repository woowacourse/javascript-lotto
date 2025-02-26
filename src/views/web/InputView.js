import { SYSTEM_MESSAGE } from '../../constants/MESSAGES.js';
import readLineAsync from '../../utils/readLineAsync.js';
import { getById, getByClass } from '../../utils/DOM.js';

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

  async enterWinningAndBonusNumber() {
    const $resultButton = getByClass('resultButton')[0];

    return new Promise((resolve) => {
      $resultButton.addEventListener('click', (e) => {
        e.preventDefault();
        const winningNumbers = Array.from({ length: 6 }, (_, idx) => idx + 1).map((idx) =>
          Number(getById(`winningNumber_${idx}`).value),
        );
        const bonusNumber = Number(getById('bonusNumber').value);
        resolve({ winningNumbers, bonusNumber });
      });
    });
  },

  async enterRestart() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_RESTART);
  },
};

export default InputView;
