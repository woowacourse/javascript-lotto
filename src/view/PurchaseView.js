export default class PurchaseView {
  constructor() {
    this.$purchaseAmountForm = document.querySelector('#lotto-purchase-amount-form');
    this.$purchaseAmountInput = document.querySelector('#lotto-purchase-amount-input');
    this.$purchaseAmountButton = document.querySelector('#lotto-purchase-amount-button');
    this.connectEvents();
  }

  connectEvents() {
    this.$purchaseAmountForm.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const purchaseAmount = this.$purchaseAmountInput.value;
    const event = new CustomEvent('purchase', { detail: purchaseAmount });

    this.$purchaseAmountForm.dispatchEvent(event);
  }

  reloadView() {
    this.$purchaseAmountInput.value = '';
  }

  printErrorMessage(message) {
    this.$purchaseAmountForm.querySelector('.error').innerHTML = message;
  }

  hideErrorMessage() {
    this.$purchaseAmountForm.querySelector('div').innerHTML = '';
  }
}
