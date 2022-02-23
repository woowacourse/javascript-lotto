import { on, emit } from '../utils/event.js';
import { $ } from '../utils/selector.js';

export default class PurchaseView {
  constructor() {
    this.$purchaseContainer = $('#purchase-container');
    this.$purchaseForm = $('#purchase-form');
    this.$purchaseInput = $('#purchase-input');
    this.$purchaseButton = $('#purchase-button');
    this.bindEvents();
  }

  bindEvents() {
    on(this.$purchaseForm, 'submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const money = this.getMoneyToPurchase();
    emit(this.$purchaseForm, '@submit', { money });
  }

  getMoneyToPurchase() {
    return this.$purchaseInput.valueAsNumber;
  }

  deactivatePurchase() {
    this.$purchaseButton.disabled = true;
    this.$purchaseInput.disabled = true;
  }
}
