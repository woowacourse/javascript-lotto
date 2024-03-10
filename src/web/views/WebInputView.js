import { purchaseResult } from '../DOM/objects';
import purchaseAmountValidator from '../../validators/purchaseAmountValidator';
import winningNumbersValidator from '../../validators/winningNumbersValidator';
import bonusNumberValidator from '../../validators/bonusNumberValidator';
import WebOutputView from './WebOutputView';
import { $, $$ } from '../../utils/querySelector';

const WebInputView = {
  readPurchaseAmount(event) {
    event.preventDefault();
    const purchaseAmountInput = $('#purchase-amount-input');
    try {
      purchaseAmountValidator.validate(purchaseAmountInput.value);
      return purchaseAmountInput.value;
    } catch (e) {
      WebOutputView.printError(purchaseResult, e.message);
      return false;
    }
  },

  readWinningAndBonusNumbers(event) {
    event.preventDefault();
    const winningNumbersResult = $('#winning-numbers-result');
    try {
      const winningNumbersInputs = $$('.winning-number-input');
      const winningNumbers = Array.from(winningNumbersInputs, input => input.valueAsNumber);
      const bonusNumber = $('#bonus-number-input').valueAsNumber;
      winningNumbersValidator.validate(winningNumbers);
      bonusNumberValidator.validate(bonusNumber, winningNumbers);
      WebOutputView.reset(winningNumbersResult);
      return { winningNumbers, bonusNumber };
    } catch (e) {
      WebOutputView.printError(winningNumbersResult, e.message);
      return false;
    }
  },
};

export default WebInputView;
