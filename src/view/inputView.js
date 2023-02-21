const priceInputForm = document.getElementById('priceInputContainer');
const priceInput = document.getElementById('priceInput');

const winningInputForm = document.getElementById('winningInputForm');
const winningInputs = document.getElementsByClassName('winningInput');

const inputView = {
  setPurchasePriceInputHandler(handlePurchasePriceInput) {
    priceInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handlePurchasePriceInput(priceInput.value);
    });
  },

  setWinningNumbersInputHandler(handleWinningNumbersInput) {
    winningInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const winningLottoNumbers = [];

      Array.from(winningInputs).forEach((input) => {
        winningLottoNumbers.push(Number(input.value));
      });

      handleWinningNumbersInput(
        winningLottoNumbers.slice(0, -1),
        winningLottoNumbers.at(-1)
      );
    });
  },
};

module.exports = inputView;
