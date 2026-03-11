class WebView {
  constructor() {
    this.$purchaseForm = document.querySelector(".purchase-form");
    this.$purchaseInput = document.querySelector(".purchase-input");
  }

  getPurchaseAmount() {
    return this.$purchaseInput.value;
  }
}

export default WebView;