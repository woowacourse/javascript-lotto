import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";

const purchaseAmountInput = document.getElementById("input_purchaseAmount");
const purchaseButton = document.getElementById("purchase_button");
const invalidPurchaseAmount = document.getElementById("invalid_purchaseAmount");

export default function purchaseClickHandler(event, resolve) {
  event.preventDefault();
  try {
    purchaseAmountValidator(purchaseAmountInput.value);
    purchaseButton.removeEventListener("click", purchaseClickHandler);
    resolve(purchaseAmountInput.value);
  } catch (error) {
    invalidPurchaseAmount.innerText = error.message;
  }
}
