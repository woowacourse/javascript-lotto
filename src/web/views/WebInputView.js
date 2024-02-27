import { $ } from '../../utils/querySelector.js';
import purchaseAmountValidator from '../../validators/purchaseAmountValidator.js';
import WebOutputView from './WebOutputView.js';
import { purchaseResult } from '../DOM/objects.js';

const WebInputView = {
  readPurchaseAmount(event) {
    event.preventDefault();
    try {
      const purchaseAmountInput = $('#purchase-amount-input').value;
      purchaseAmountValidator.validate(purchaseAmountInput);
      WebOutputView.reset(purchaseResult);
      return purchaseAmountInput;
    } catch (e) {
      WebOutputView.printError(purchaseResult, e.message);
    }
  },
};

export default WebInputView;
