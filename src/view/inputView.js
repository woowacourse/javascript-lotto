const priceInputForm = document.getElementById('priceInputContainer');
const priceInput = document.getElementById('priceInput');

const inputView = {
  setPurchasePriceInputHandler(handlePurchasePriceInput) {
    priceInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handlePurchasePriceInput(priceInput.value);
    });
  },
};

module.exports = inputView;
