class PurchaseAmountOutputView {
  purchaseAmountInputView = document.querySelector('.input-purchase-amount');
  purchaseAmountErrorView = document.querySelector('.text-purchase-amount-error');
  purchaseButtonView = document.querySelector('.button-purchase-amount');

  displayPurchaseAmountInput(disabled) {
    this.purchaseAmountInputView.value = null;
    this.purchaseAmountInputView.disabled = disabled;
  }

  displayPurchaseAmountError(message) {
    this.purchaseAmountErrorView.textContent = message;
  }

  displayPurchaseButton(disabled) {
    this.purchaseButtonView.disabled = disabled;
  }

  resetToInitialState() {
    this.purchaseAmountInputView.value = '';
    this.displayPurchaseAmountInput(false);
    this.displayPurchaseAmountError('');
    this.displayPurchaseButton(false);
  }
}

export default new PurchaseAmountOutputView();
