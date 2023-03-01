class PurchaseView {
  constructor(submitPurchaseAmount) {
    this.purchaseInput = document.querySelector(".purchase-input");
    this.purchaseButton = document.querySelector(".purchase-btn");
    this.purchaseForm = document.querySelector(".purchase-form");
    this.purchaseForm.addEventListener("submit", submitPurchaseAmount);
  }
}

export default PurchaseView;
