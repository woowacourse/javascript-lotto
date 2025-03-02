const readLottoPriceInput = (validator, renderer) => {
  const purchaseForm = document.querySelector(".purchase-form");

  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const price = Number(document.querySelector("#price").value);
    const isValidPrice = validator(price);

    if (isValidPrice) {
      renderer(price);
    }
  });
};

export default readLottoPriceInput;
