import ID from '../constants/selector.js';
import { on, emit } from '../utils/event.js';
import { $ } from '../utils/selector.js';
import CUSTOM_EVENT from '../constants/event.js';

export default class PurchaseView {
  constructor() {
    this.$purchaseForm = $(ID.PURCHASE_FORM);
    this.$purchaseInput = $(ID.PURCHASE_INPUT);
    this.$purchaseButton = $(ID.PURCHASE_BUTTON);
    this.bindEvents();
  }

  bindEvents() {
    on(this.$purchaseForm, 'submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const money = this.getMoneyToPurchase();
    emit(this.$purchaseForm, CUSTOM_EVENT.PURCHASE, { money });
  }

  getMoneyToPurchase() {
    return this.$purchaseInput.valueAsNumber;
  }

  deactivatePurchaseForm() {
    this.$purchaseButton.disabled = true;
    this.$purchaseInput.disabled = true;
  }
}
