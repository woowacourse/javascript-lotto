const priceInputForm = document.getElementById('priceInputForm');
const priceInput = document.getElementById('priceInput');

const winningInputForm = document.getElementById('winningInputForm');
const winningInputs = document.getElementsByClassName('winningInput');

const modalCloseButton = document.getElementById('modalCloseButton');
const resultModalContainer = document.getElementById('resultModalContainer');

const restartButton = document.getElementById('restartButton');

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

  setCloseModalHandler(handleCloseModal) {
    modalCloseButton.addEventListener('click', () => {
      handleCloseModal();
    });
    resultModalContainer.addEventListener('click', (event) => {
      if (event.target.id === 'resultModalContainer') handleCloseModal();
    });
  },

  setRestartHandler(handleRestart) {
    restartButton.addEventListener('click', () => {
      handleRestart();
    });
  },
};

export default inputView;
