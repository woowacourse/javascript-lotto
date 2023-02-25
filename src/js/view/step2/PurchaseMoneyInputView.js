class PurchaseMoneyInputView {
  constructor() {
    this.form = document.getElementById('purchase-money-form');
    this.input = document.getElementById('purchase-money-input');
    this.button = document.getElementById('purchase-money-button');
  }

  resetValue() {
    this.input.value = '';
  }

  setDisableButton() {
    this.resetValue();
    this.button.style.background = '#8b8b8b';
    this.button.disabled = true;
  }

  setAbleButton() {
    this.button.style.background = '#4e5ba6';
    this.input.disabled = false;
    this.button.disabled = false;
  }
}

export default PurchaseMoneyInputView;
