import purchaseAmountValidator from '../../validators/purchaseAmountValidator';
import WebOutputView from './WebOutputView';
import { purchaseAmountInput, purchaseResult, winningNumbersResult } from '../DOM/objects';
import winningNumbersValidator from '../../validators/winningNumbersValidator';
import bonusNumberValidator from '../../validators/bonusNumberValidator';
import { $, $$ } from '../../utils/querySelector';

const WebInputView = {
  readPurchaseAmount(event) {
    event.preventDefault();
    try {
      purchaseAmountValidator.validate(purchaseAmountInput.value);
      WebOutputView.reset(purchaseResult);
      return purchaseAmountInput.value;
    } catch (e) {
      WebOutputView.printError(purchaseResult, e.message);
      return false;
    }
  },

  readWinningAndBonusNumbers(event) {
    event.preventDefault();
    try {
      const winningNumbersInputs = $$('.winning-number-input');
      const winningNumbers = Array.from(winningNumbersInputs, input => input.valueAsNumber);
      const bonusNumber = $('#bonus-number-input').valueAsNumber;
      winningNumbersValidator.validate(winningNumbers);
      bonusNumberValidator.validate(bonusNumber, winningNumbers);
      return { winningNumbers, bonusNumber };
    } catch (e) {
      WebOutputView.printError(winningNumbersResult, e.message);
      console.log(e.message);
      return false;
    }
  },
};

export default WebInputView;
