import { $ } from '../utils/dom.js';
import { ID_SELECTOR } from '../constants.js';
import View from '../core/View.js';

export default class PurchaseFormView extends View {
  _configureDOM() {
    this.$purchaseForm = $(ID_SELECTOR.PURCHASE_FORM);
  }

  _bindEvents() {
    this.$purchaseForm.addEventListener('submit', event => {
      event.preventDefault();
      this.props.submitCashHandler(event.target.elements.cash.value);
    });
  }
}
