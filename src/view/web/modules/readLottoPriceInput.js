import { getPrice } from "../globalElements/getElements";

const readLottoPriceInput = (validator, renderer) => {
  const purchaseForm = document.querySelector(".purchase-form");

  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const price = getPrice();
    const isValidPrice = validator(price);

    if (isValidPrice) {
      renderer(price);
    }
  });
};

export default readLottoPriceInput;
