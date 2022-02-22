import { $, $$ } from '../utils/selector.js';

export default class PurchaseView {
  constructor() {
    this.$purchaseContainer = $('#purchase-container');
    this.$purchaseInput = $('#purchase-input');
  }

  getMoneyToPurchase() {
    return this.$purchaseInput.valueAsNumber;
  }
}
