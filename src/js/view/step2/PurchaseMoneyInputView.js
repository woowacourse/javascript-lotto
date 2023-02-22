class PurchaseMoneyInputView {
  constructor() {
    this.form = document.getElementById('purchase-money-form');
    this.input = document.getElementById('purchase-money-input');
  }

  reset() {
    this.input.value = '';
  }
}

export default PurchaseMoneyInputView;
