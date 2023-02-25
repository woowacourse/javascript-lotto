class PurchaseMoneyInputView {
  constructor() {
    this.form = document.getElementById('purchase-money-form');
    this.input = document.getElementById('purchase-money-input');
  }

  resetValue() {
    this.input.value = '';
  }

  disableButton() {
    const button = document.getElementById('purchase-money-button');
    button.style.background = '#8b8b8b';
    button.disabled = true;
  }
}

export default PurchaseMoneyInputView;
