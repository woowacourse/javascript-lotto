import { $, $$ } from '../utils/selector.js';

export default class PurchaseView {
  constructor() {
    this.$purchaseContainer = $('#purchase-container');
    this.$purchaseInput = $('#purchase-input');
    this.$purchaseButton = $('#purchase-button');
  }

  getMoneyToPurchase() {
    return this.$purchaseInput.valueAsNumber;
  }

  deactivatePurchase() {
    this.$purchaseButton.disabled = true;
    this.$purchaseInput.disabled = true;
  }
}
