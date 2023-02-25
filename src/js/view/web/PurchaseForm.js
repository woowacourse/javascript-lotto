const $budgetInput = document.getElementById('budget-input');
const $budgetInputForm = document.getElementById('budget-input-form');
const $winningNumberInputs = document.getElementsByClassName('winning-number-input');
const $winningNumberInputForm = document.getElementById('winning-number-input-form');
const $modalCloseButton = document.getElementById('modal-close-button');
const $retryButton = document.getElementById('retry-button');

const PurchaseForm = {
  setBudgetInputHandler(handler) {
    $budgetInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(+$budgetInput.value);
    });
  },

  setWinningNumberInputHandler(handler) {
    $winningNumberInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const winningNumbers = Array.from($winningNumberInputs).map((input) => +input.value);
      handler(winningNumbers);
    });
  },

  setModalCloseButtonHandler(handler) {
    $modalCloseButton.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  },

  setRetryButtonHandler(handler) {
    $retryButton.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  },
};

export default PurchaseForm;
