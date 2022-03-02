import { ID_SELECTOR } from '../constants';
import View from '../core/View';
import { $, enableElement, disableElement, clearInputValue } from '../utils/dom';

export default class PurchaseFormView extends View {
  _configureDOM() {
    this.$input = this.container.elements.cash;
    this.$submitButton = $(ID_SELECTOR.PURCHASE_SUBMIT_BUTTON, this.container);
  }

  _bindEvents() {
    this.container.addEventListener('submit', event => {
      event.preventDefault();
      this.props.submitCashHandler(this.$input.value);
    });
  }

  completeSubmit() {
    disableElement(this.$input);
    disableElement(this.$submitButton);
  }

  reset() {
    enableElement(this.$input);
    enableElement(this.$submitButton);
    clearInputValue(this.$input);
  }
}
