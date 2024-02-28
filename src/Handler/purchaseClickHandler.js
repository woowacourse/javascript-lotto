import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import WebView from "../view/webView.js";

const purchaseAmountInput = document.getElementById("input_purchaseAmount");
const purchaseButton = document.getElementById("purchase_button");
const invalidPurchaseAmount = document.getElementById("invalid_purchaseAmount");

export default function purchaseClickHandler(event, resolve, reject) {
  event.preventDefault();
  try {
    purchaseAmountValidator(purchaseAmountInput.value);
    const purchaseAmount = Number(purchaseAmountInput.value);

    WebView.showAfterPurchases();
    WebView.showPurchaseAmount(purchaseAmountInput.value);

    purchaseButton.removeEventListener("click", purchaseClickHandler);

    resolve(purchaseAmount);
  } catch (error) {
    invalidPurchaseAmount.innerText = error.message;
    reject(error);
  }
}
