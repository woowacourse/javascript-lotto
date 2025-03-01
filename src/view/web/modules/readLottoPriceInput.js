const readLottoPriceInput = (validator, renderer) => {
  const purchaseForm = document.querySelector(".purchase-form");

  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const price = document.querySelector("#price").value;
    validator(price);

    renderer(price);
  });
};

export default readLottoPriceInput;
