import { PURCHASE_PRICE } from '../../constants/CONFIGURATIONS.js';
import { getById, getByClass } from '../../utils/dom.js';
import { BonusNumberValidator } from '../../validators/BonusNumberValidator.js';
import { PurchasePriceValidator } from '../../validators/PurchasePriceValidator.js';
import { WinningNumbersValidator } from '../../validators/WinningNumbersValidator.js';
import LottoResultModal from './components/LottoResultModal.js';

const InputView = {
  $purchaseInput: getById('purchaseInput'),
  $purchaseForm: document.querySelector('section.purchase form'),

  enterPurchasePrice() {
    const self = this;
    return new Promise((resolve) => {
      function handleSubmit(e) {
        e.preventDefault();
        try {
          resolve(self.getPurchasePrice());
        } catch (error) {
          alert(error.message);
          self.resetPurchaseInput();
        }
      }
      this.$purchaseForm.addEventListener('submit', handleSubmit);
    });
  },

  getPurchasePrice() {
    const purchasePrice = Number(this.$purchaseInput.value);
    PurchasePriceValidator.validate(Number(this.$purchaseInput.value));
    const lottoCount = purchasePrice / PURCHASE_PRICE.UNIT;
    return { purchasePrice, lottoCount };
  },

  resetPurchaseInput() {
    this.$purchaseInput.focus();
    this.$purchaseInput.value = '';
  },

  async enterWinningAndBonusNumber() {
    const self = this;
    const $resultButton = getByClass('resultButton')[0];
    return new Promise((resolve) => {
      $resultButton.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          resolve(self.getWinningAndBonusNumbers());
        } catch (error) {
          alert(error.message);
        }
      });
    });
  },

  getWinningAndBonusNumbers() {
    const winningNumbers = Array.from({ length: 6 }, (_, idx) => idx + 1).map((idx) =>
      Number(getById(`winningNumber_${idx}`).value),
    );
    const bonusNumber = Number(getById('bonusNumber').value);
    WinningNumbersValidator.validate(winningNumbers);
    BonusNumberValidator.validate(bonusNumber, winningNumbers);
    LottoResultModal.openModal();

    return { winningNumbers, bonusNumber };
  },
};

export default InputView;
