import { getById, getByClass } from '../../utils/dom.js';

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
};

export default InputView;
