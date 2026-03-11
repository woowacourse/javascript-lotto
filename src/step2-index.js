import Validator from "./utils/Validator";

const purchaseForm = document.querySelector("form");
const priceInput = document.querySelector("#purchase-price");

purchaseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const price = Number(priceInput.value);

    Validator.validateNumber(price);
    Validator.validatePurchaseUnit(price);

    purchaseForm.reset();
  } catch (error) {
    alert(error.message);
  }
});
