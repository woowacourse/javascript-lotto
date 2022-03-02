import { ID_SELECTOR } from '../constants';
import View from '../core/View';
import { $, disableElement } from '../utils/dom';

export default class PurchaseFormView extends View {
  _bindEvents() {
    this.container.addEventListener('submit', event => {
      event.preventDefault();
      this.props.submitCashHandler(event.target.elements.cash.value);
    });
  }

  completeSubmit() {
    disableElement(this.container.elements.cash);
    disableElement($(ID_SELECTOR.PURCHASE_SUBMIT_BUTTON, this.container));
  }

  reset() {
    this.container.elements.cash.value = '';
  }
}
