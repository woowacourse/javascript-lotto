import View from '../core/View';

export default class PurchaseFormView extends View {
  _bindEvents() {
    this.container.addEventListener('submit', event => {
      event.preventDefault();
      this.props.submitCashHandler(event.target.elements.cash.value);
    });
  }

  clearInput() {
    this.container.elements.cash.value = '';
  }
}
