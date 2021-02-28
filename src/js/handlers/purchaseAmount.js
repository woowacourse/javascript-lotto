import { LESS_THAN_TICKET_PRICE_MESSAGE } from '../lib/constants/alertMessage.js';
import { TICKET_PRICE } from '../lib/constants/lotto.js';
import {
  $,
  disableElements,
  focusInput,
  insertAfter,
} from '../lib/utils/dom.js';
import { createManualPurchaseTemplate } from '../lib/utils/template.js';
import { money } from '../model/money.js';
import manualPurchaseHandler from './manualPurchase.js';

const purchaseAmountHandler = event => {
  event.preventDefault();
  money.totalAmount = Number(event.target.elements['payment-input'].value);

  if (money.totalAmount < TICKET_PRICE) {
    alert(LESS_THAN_TICKET_PRICE_MESSAGE);
    return;
  }

  disableElements(event);
  insertAfter(event.target, createManualPurchaseTemplate());

  $('#remaining-money').innerHTML = money.totalAmount;
  $('#manual-purchase-form').addEventListener('submit', manualPurchaseHandler);
  focusInput('input', 'manual-purchase-input');
};

export default purchaseAmountHandler;
