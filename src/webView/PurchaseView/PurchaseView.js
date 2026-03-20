const html = String.raw;

export default class PurchaseView {
  constructor() {
    this.$purchaseForm = document.querySelector("#purchase-form");
    this.$purchaseAmount = document.querySelector("#purchase-amount");
    this.$purchaseError = document.querySelector("#purchase-error");
  }

  bindPurchase(handler) {
    this.$purchaseForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const amount = Number(this.$purchaseAmount.value);
      handler(amount);
    });
  }

  showError(message) {
    this.$purchaseError.textContent = message;
    this.$purchaseError.hidden = false;
    this.$purchaseAmount.focus();
  }

  clearError() {
    this.$purchaseError.textContent = "";
    this.$purchaseError.hidden = true;
  }

  clearInput() {
    this.$purchaseAmount.value = "";
  }
}
