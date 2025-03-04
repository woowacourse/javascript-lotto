import { LOTTO, PURCHASE_PRICE } from '../../constants/CONFIGURATIONS.js';
import { getById, querySelector } from './utils/dom.js';
import { BonusNumberValidator } from '../../validators/BonusNumberValidator.js';
import { PurchasePriceValidator } from '../../validators/PurchasePriceValidator.js';
import { WinningNumbersValidator } from '../../validators/WinningNumbersValidator.js';

const InputView = {
  $purchaseInput: getById('purchaseInput'),
  $purchaseForm: querySelector('section.purchase form'),
  $resultButton: querySelector('.resultButton'),

  enterPurchasePrice() {
    const purchasePrice = Number(this.$purchaseInput.value);
    PurchasePriceValidator.validate(purchasePrice);
    const lottoCount = purchasePrice / PURCHASE_PRICE.UNIT;
    return lottoCount;
  },

  enterWinningAndBonusNumber() {
    const winningNumbers = Array.from({ length: LOTTO.NUMBER_LENGTH }, (_, idx) => idx + 1).map(
      (idx) => Number(getById(`winningNumber_${idx}`).value),
    );
    const bonusNumber = Number(getById('bonusNumber').value);
    WinningNumbersValidator.validate(winningNumbers);
    BonusNumberValidator.validate(bonusNumber, winningNumbers);
    return { winningNumbers, bonusNumber };
  },

  resetPurchaseInput() {
    this.$purchaseInput.focus();
    this.$purchaseInput.value = '';
  },
};

export default InputView;
