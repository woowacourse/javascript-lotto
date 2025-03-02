import { getPrice } from "../globalElements/getElements.js";

const readLottoPrice = (validator, renderer) => {
  const purchaseForm = document.querySelector(".purchase-form");
  const purchaseContainer = document.querySelector(".purchase-container");

  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const price = getPrice();
    const isValidPrice = validator(price);

    if (isValidPrice) {
      purchaseContainer.querySelectorAll("input, button").forEach((element) => {
        element.disabled = true;
      });

      renderer(price);
    }
  });
};

export default readLottoPrice;
