class PurchaseView {
  constructor(submitPurchaseAmount) {
    this.purchaseInput = document.getElementsByClassName("purchase-input")[0];
    this.purchaseButton = document.getElementsByClassName("purchase-btn")[0];
    this.purchaseForm = document.getElementsByClassName("purchase-form");
    this.purchaseForm[0].addEventListener("submit", submitPurchaseAmount);
  }
}

export default PurchaseView;
